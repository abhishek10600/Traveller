const db = require("../dbConnection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createTokenAndCookie = require("../utils/createTokenAndCookie.js");

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        let q = "SELECT * FROM users WHERE email = ?";
        db.query(q, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                })
            } else if (result.length) {
                return res.status(401).json({
                    success: false,
                    message: "User with this email already exists."
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                q = "INSERT INTO users (name, email, password) VALUES(?, ?, ?)";
                db.query(q, [name, email, hashedPassword], (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Some error"
                        })
                    }
                    return res.status(201).json({
                        success: true,
                        message: "User created successfully."
                    })
                })
            }
        })
    } catch (error) {
        next(error);
    }
}

const login = (req, res) => {
    const { email, password } = req.body;
    let q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        } else if (!result.length) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        } else {
            const isPasswordMatched = await bcrypt.compare(password, result[0].password);
            if (!isPasswordMatched) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                })
            } else {
                createTokenAndCookie(res, result, `Welcome, ${result[0].name}`, 200);
            }
        }
    })
}

const userProfile = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    })
}

const logout = (req, res) => {
    return res.status(200).cookie("token", "").json({
        success: true,
        message: "You have been logged out successfully."
    })
}

module.exports = { signup, login, userProfile, logout };