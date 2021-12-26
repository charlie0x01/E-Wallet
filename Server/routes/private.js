const express = require("express");
const router = express.Router();
const { privateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");
const {
  addExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expense");
const {
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");
const { cashDeposit } = require("../controllers/wallet");

// protected routes
router.get("/private", protect, privateRoute);
// manage wallet
router.post("/wallet/deposit", protect, cashDeposit);
// manage expenses
router.post("/wallet/expense", protect, addExpense);
router.delete("/wallet/expense?id", protect, deleteExpense);
router.put("/wallet/expense", protect, updateExpense);
// manage user categories
router.post("/wallet/category", protect, addCategory);
router.delete("/wallet/category?id", protect, deleteCategory);
router.put("/wallet/category", protect, updateCategory);

module.exports = router;
