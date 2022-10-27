const jwt = require('jsonwebtoken')
const config = require('config')


const generateLoginJwt = (userId) => {
    return jwt.sign({ userId }, config.get('jwtSecret'), { expiresIn: '1h' })
}

const generateCodeJwt = (data, code) => {
    return jwt.sign({ data, code }, config.get('jwtSecret'), { expiresIn: '5m' })
}

const verifyCodeJwt = (token, code) => {
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        if(decoded.code !== code) { return { error: 'false code' } }

        return { error: false, data: decoded.data }
    } catch {
        return { error: 'time out' }
    }
}


module.exports = { 
    generateLoginJwt,
    generateCodeJwt,
    verifyCodeJwt,
}
