const jwt = require('jsonwebtoken')

const generateAdminToken = (id) => {
    return jwt.sign({ id }, process.env.adminSecretKey, {
        expiresIn: '20d'
    })
}
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.secretKey, {
        expiresIn: '20d'
    })
}

module.exports = { generateAdminToken, generateToken }