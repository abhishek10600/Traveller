const jwt = require("jsonwebtoken");
const db = require("../dbConnection.js");

const authentication = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login first."
        })
    }
    const decodedData = jwt.verify(token, process.env.jwt_secretKey);
    let q = "SELECT ID,name,email,createdAt from users WHERE ID = ?";
    db.query(q, [decodedData.id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        }
        req.user = result;
        next();
    })
}

module.exports = authentication;