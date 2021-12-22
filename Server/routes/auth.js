const express = require("express");
const { register, login, forgetPassword } = require("../controllers/auth");

const router = express.Router();

// routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);

module.exports = router;
