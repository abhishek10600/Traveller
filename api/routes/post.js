const express = require("express");
const { createPost, getPosts, getPostById, deletePostById } = require("../controllers/post.js");
const authentication = require("../middlewares/userAuthentication.js");
const uploadMiddleware = require("../middlewares/multerMiddleware.js");

const router = express.Router();

router.post("/createPost", authentication, uploadMiddleware.single("file"), createPost);
router.get("/", getPosts);
router.get("/post/:id", getPostById);
router.delete("/deletePost/:id", deletePostById);

module.exports = router;