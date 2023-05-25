const express = require("express");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.js");
const postRouter = require("./routes/post.js");
const cors = require("cors");

config({
    path: "./private/config.env"
})

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/api/users/", userRouter);
app.use("/api/posts/", postRouter);

module.exports = app;