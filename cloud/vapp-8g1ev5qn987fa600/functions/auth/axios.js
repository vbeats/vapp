const request = require('axios')

const axios = request.create({
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const errorHandler = (error) => {
  console.log(error)
  return Promise.reject({code: 600, msg: '网络异常~'})
}

// 拦截器
axios.interceptors.request.use((config) => {
  return config
}, errorHandler)

axios.interceptors.response.use((response) => {
  if (response.data && response.data.code) {
    return response.data
  }
  return response
}, errorHandler)

module.exports = axios
