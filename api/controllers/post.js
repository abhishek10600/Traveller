const db = require("../dbConnection.js");

const createPost = (req, res) => {
    const { title, description } = req.body;
    const image = req.file.filename;
    const userID = req.user[0].ID;
    let q = `INSERT INTO posts (userID, title, description, image) VALUES (?, ?, ?, ?)`;
    db.query(q, [userID, title, description, image], (err, result) => {
        if (err) {
            console.log(err);
        }
        return res.status(201).json({
            success: true,
            message: "Post created successfully."
        })
    })
}

const getPosts = (req, res) => {
    let q = "SELECT * FROM posts";
    db.query(q, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        }
        if (result.length) {
            return res.status(200).json({
                success: true,
                result
            })
        }
    })
}

const getPostById = (req, res) => {
    const postID = req.params.id;
    let q = "SELECT * FROM posts WHERE postID = ?";
    db.query(q, [postID], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        }
        else if (result.length) {
            return res.status(200).json({
                success: true,
                result
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "This post does not exists."
            })
        }
    })
}

const deletePostById = (req, res) => {
    const postID = req.params.id;
    const q = "DELETE FROM posts WHERE postID = ?";
    db.query(q, [postID], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Your post has been deleted successfully"
            })
        }
    })
}

module.exports = { createPost, getPosts, getPostById, deletePostById };