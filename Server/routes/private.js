const express = require("express");
const router = express.Router();
const { privateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.get("/private",protect, privateRoute);

module.exports = router;