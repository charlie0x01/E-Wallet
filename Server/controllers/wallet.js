const Wallet = require("../models/Wallet");

exports.updateWallet = async (req, res, next) => {
  const { balance, expenses, userid } = req.body;

  console.log(balance, expenses, userid);
  try {
    await Wallet.updateWallet(balance, userid, expenses);
    res.json({ success: true, message: "Wallet Uploaded" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
