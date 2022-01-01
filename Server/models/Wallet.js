const { pool } = require("../config/db");

// wallet class
class Wallet {
  constructor() {}
  static updateWallet(balance, userid, expenses) {
    try {
      // deposit cash
      pool.execute("update wallets set balance = ? where userid = ?", [
        balance,
        userid,
      ]);
    } catch (error) {
      throw error;
    }
  }

  static getWallet(userid) {
    try {
      // deposit cash
      // const [res, _] = pool.execute(
      //   "select ",
      //   [userid]
      // );
      // console.log(cash[0]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Wallet;
