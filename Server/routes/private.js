const express = require("express");
const router = express.Router();
// const { privateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");
const { updateWallet, getWallet } = require("../controllers/wallet");

// protected routes
// router.get("/private", protect, privateRoute);
// manage wallet
router.post("/update/wallet", protect, updateWallet);
router.post("/get/wallet", protect, getWallet);

module.exports = router;
