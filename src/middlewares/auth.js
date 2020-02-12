const jwt = require('jsonwebtoken')
const CONSTANTS = require('../constants')

exports.verifyToken = (req, res, next) => {
    const { token } = req.headers
    jwt.verify(token, CONSTANTS.JWT.SEED, (err, decoded) => {
        if (err) res.status(401).json({ success: false, message: CONSTANTS.UN_AUTH_ERROR_MESSAGE })
        req.userFromToken = decoded.user
        next()
    })
}