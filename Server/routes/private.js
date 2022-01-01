const express = require("express");
const router = express.Router();
// const { privateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");
const { updateWallet } = require("../controllers/wallet");

// protected routes
// router.get("/private", protect, privateRoute);
// manage wallet
router.post("/wallet", protect, updateWallet);

module.exports = router;
