const jwt = require('jsonwebtoken')
const config = require('config')


const generateJwt = (userId) => {
    const token = jwt.sign({ userId }, config.get('jwtSecret'), { expiresIn: '1h' })
    return token
}

module.exports = generateJwt
