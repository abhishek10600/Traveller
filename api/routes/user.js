const express = require("express");
const { signup, login, userProfile, logout } = require("../controllers/user.js");
const authentication = require("../middlewares/userAuthentication.js");

const router = express.Router();

router.post("/registerUser", signup);
router.post("/loginUser", login);
router.get("/profile", authentication, userProfile);
router.get("/logout", authentication, logout);

module.exports = router;