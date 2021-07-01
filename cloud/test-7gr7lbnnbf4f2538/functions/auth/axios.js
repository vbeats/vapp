const request = require('axios')
const axios = request.create({
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json; charset=utf8'
  }
})

module.exports = axios
