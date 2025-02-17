import axios from 'axios'

// 環境變數
const authTokenCookieName = import.meta.env.VITE_AUTH_COOKIE_NAME
const ssoLoginUrl = import.meta.env.VITE_SSO_LOGIN_URL
const apiGatewayUrl = `${import.meta.env.VITE_API_GATEWAY_URL}/api/v1`

// 解析 Cookie 的函式
function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))

  return match ? match.split('=')[1] : null
}

const apiInstance = axios.create({
  baseURL: apiGatewayUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 請求攔截器：自動附加 JWT Token
apiInstance.interceptors.request.use(
  config => {
    if (!authTokenCookieName) {
      console.error('[Auth] VITE_AUTH_COOKIE_NAME 環境變數未設定')

      return config
    }

    const token = import.meta.env.MODE === 'development' ? import.meta.env.VITE_DEV_AUTH_TOKEN : getCookie(authTokenCookieName)

    if (token)
      config.headers.Authorization = `Bearer ${token}`

    if (import.meta.env.MODE === 'development')
      console.debug('[API] 發送請求:', config)

    return config
  },
  error => {
    console.error('[API] 請求錯誤:', error)

    return Promise.reject(error)
  },
)

// 回應攔截器：處理 401 錯誤
apiInstance.interceptors.response.use(
  response => {
    if (import.meta.env.MODE === 'development')
      console.debug('[API] 收到回應:', response)

    return response
  },
  error => {
    if (import.meta.env.MODE === 'development')
      console.error('[API] 回應錯誤:', error.response)

    if (error.response?.status === 401) {
      if (ssoLoginUrl) {
        console.warn('[Auth] 未授權，導向 SSO 登入頁:', ssoLoginUrl)
        window.location.href = ssoLoginUrl
      }
      else {
        console.error('[Auth] VITE_SSO_LOGIN_URL 環境變數未設定，無法導向 SSO 登入頁')
      }

      return Promise.reject(new Error('未授權，請重新登入'))
    }

    return Promise.reject(error)
  },
)

export default apiInstance
