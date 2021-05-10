import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  headers: { Pragma: 'no-cache' }
})

export default api
