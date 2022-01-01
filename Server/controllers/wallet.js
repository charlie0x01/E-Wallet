const Wallet = require("../models/Wallet");

const wallet = new Wallet();

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

exports.getWallet = async (req, res, next) => {
  try {
    const wall = await wallet.getWallet(req.body.userid);
    res.json({ success: true, wallet: wall });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
