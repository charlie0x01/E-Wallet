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
      pool
        .execute("select walletid from wallets where userid = ?", [userid])
        .then(([row, field]) => {
          if (expenses) {
            pool.execute("truncate expenses").then(() => {
              expenses.forEach((element) => {
                pool.execute(
                  "insert into expenses(description, expenseamount, expensedate, walletid) values(?, ?, ?, ?);",
                  [
                    element.description,
                    element.amount,
                    element.date,
                    row[0].walletid,
                  ]
                );
              });
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async getWallet(userid) {
    try {
      const [row, field] = await pool.execute(
        "select * from wallets where userid = ?;",
        [userid]
      );
      const balance = row[0].Balance;
      console.log(balance);
      const [expenses, _] = await pool.execute(
        "select description, expenseamount as amount, expensedate as 'date' from expenses where walletid = ?;",
        [row[0].WalletID]
      );
      const wall = { balance: balance, expenses: expenses };
      return wall;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Wallet;
