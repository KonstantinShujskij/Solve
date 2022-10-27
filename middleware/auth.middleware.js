const config = require('config');
const jwt = require('jsonwebtoken');
const errors = require('../errors');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') { return next() }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) { return res.status(401).json(errors.notAuth) }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch(error) {
        return res.status(402).json(errors.notAuth)
    }
}