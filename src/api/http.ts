import axios from 'axios'

const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL

const apiClient = axios.create({
  baseURL: API_GATEWAY_URL,
})
