const NodeRSA = require('node-rsa')
const config = require('./config')

const publicKey = config.public_key

const rsa = new NodeRSA(publicKey, 'pkcs8-public-pem', {encryptionScheme: 'pkcs1'})

const encrypt = (content) => {
  if (!content || content === '') {
    return null
  }
  return rsa.encrypt(content, 'base64')
}

module.exports = encrypt
