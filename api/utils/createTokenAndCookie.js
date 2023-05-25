const jwt = require("jsonwebtoken");

const getTokenAndCookie = (res, result, message, statusCode = 200) => {
    const token = jwt.sign({ id: result[0].ID }, process.env.jwt_secretKey);
    return res.status(statusCode).cookie("token", token, {
        httpOnly: true
    }).json({
        success: true,
        message: message
    })
}

module.exports = getTokenAndCookie;