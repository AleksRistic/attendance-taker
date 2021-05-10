import axios from 'axios'

const https = require('https')

const apiAttach = axios.create({
  baseURL: 'http://localhost:3001',
  header: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

export default apiAttach
