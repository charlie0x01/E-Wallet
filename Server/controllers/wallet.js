const Wallet = require("../models/Wallet");

exports.cashDeposit = async (req, res, next) => {
  const { Cash, WalletId } = req.body;
  const responst = await Wallet.cashDeposit(Cash, WalletId);
  next();
};
