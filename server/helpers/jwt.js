const { sign, verify } = require("jsonwebtoken")

const generateAccessToken = (payload) => {
    return sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

const verifyAccessToken = (token) => {
    return verify(token, process.env.JWT_SECRET)
}

module.exports = { generateAccessToken, verifyAccessToken }