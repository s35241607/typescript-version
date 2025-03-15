import{a as n}from"./axios-upsvKRUO.js";const i="undefined",o=n.create({baseURL:i,timeout:3e4,headers:{"Content-Type":"application/json"}});o.interceptors.request.use(e=>(console.error("[Auth] VITE_AUTH_COOKIE_NAME 環境變數未設定"),e),e=>(console.error("[API] 請求錯誤:",e),Promise.reject(e)));o.interceptors.response.use(e=>e,e=>{var s;return((s=e.response)==null?void 0:s.status)===401?(console.error("[Auth] VITE_SSO_LOGIN_URL 環境變數未設定，無法導向 SSO 登入頁"),Promise.reject(new Error("未授權，請重新登入"))):Promise.reject(e)});const a={get:async(e,s)=>{try{return(await o.get(e,s)).data}catch(t){throw console.error("GET 請求失敗:",t),t}},post:async(e,s,t)=>{try{return(await o.post(e,s,t)).data}catch(r){throw console.error("POST 請求失敗:",r),r}},put:async(e,s,t)=>{try{return(await o.put(e,s,t)).data}catch(r){throw console.error("PUT 請求失敗:",r),r}},delete:async(e,s)=>{try{return(await o.delete(e,s)).data}catch(t){throw console.error("DELETE 請求失敗:",t),t}},postForm:async(e,s,t)=>{try{return(await o.postForm(e,s,t)).data}catch(r){throw console.error("POST FORM 請求失敗:",r),r}},download:async(e,s)=>{try{return(await o.get(e,{...s,responseType:"blob"})).data}catch(t){throw console.error("檔案下載失敗:",t),t}}},c={register:async e=>await a.post("/api/v1/auth/register",e),login:async e=>await a.post("/api/v1/auth/login",e),changePassword:async e=>await a.post("/api/v1/auth/change-password",e),forgotPassword:async e=>await a.post("/api/v1/auth/forgot-password",e),resetPassword:async e=>await a.post("/api/v1/auth/reset-password",e),googleAuth:async e=>await a.get(`/api/v1/auth/google-auth?returnUrl=${e}`),googleCallback:async e=>await a.get(`/api/v1/auth/google-callback${e?`?returnUrl=${e}`:""}`),getPermissions:async()=>await a.get("/api/v1/permissions"),createPermission:async e=>await a.post("/api/v1/permissions",e),getPermissionById:async e=>await a.get(`/api/v1/permissions/${e}`),updatePermission:async(e,s)=>await a.put(`/api/v1/permissions/${e}`,s),deletePermission:async e=>await a.delete(`/api/v1/permissions/${e}`),getRoles:async()=>await a.get("/api/v1/roles"),createRole:async e=>await a.post("/api/v1/roles",e),getRoleById:async e=>await a.get(`/api/v1/roles/${e}`),updateRole:async(e,s)=>await a.put(`/api/v1/roles/${e}`,s),deleteRole:async e=>await a.delete(`/api/v1/roles/${e}`),getUsers:async()=>await a.get("/api/v1/users"),getUserById:async e=>await a.get(`/api/v1/users/${e}`),getUserByUsername:async e=>await a.get(`/username/${e}`),getCurrentUser:async()=>await a.get("/api/v1/users/me"),createUser:async e=>await a.post("/api/v1/users",e),updateUser:async(e,s)=>await a.put(`/api/v1/users/${e}`,s),getUserImage:async e=>await a.download(`/api/v1/users/${e}/image`),uploadUserImage:async(e,s)=>await a.postForm(`/api/v1/users/${e}/image`,s)};export{c as u};
