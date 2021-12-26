const express = require("express");
const {
  register,
  login,
  forgetPassword,
  resetPassword,
} = require("../controllers/auth");

const router = express.Router();

// routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword", resetPassword);

module.exports = router;
