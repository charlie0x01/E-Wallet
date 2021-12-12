const express = require("express");
const { register, login, forgetPassword, resetPassword } = require("../controllers/auth");

const router = express.Router();

// routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgetpassword', forgetPassword);
router.put('/resetpassword/:id', resetPassword);

module.exports = router;