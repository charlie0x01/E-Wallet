const { pool } = require("../config/db");

// wallet class
class Wallet {
  constructor() {}
  static cashDeposit(cash, walletid) {
    try {
      // deposit cash
      const [res, _] = pool.execute(
        "update wallets set balance = ? where walletid = ?",
        [cash, walletid]
      );
      console.log(cash[0]);
    } catch (error) {
      throw error;
    }
  }
}
