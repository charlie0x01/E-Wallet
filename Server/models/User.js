const { pool, transaction } = require("../config/db");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async save() {
    // create a query to register user in database
    // after registering new user, we will create a new wallet for the new user
    let registerUser = `insert into users(username, email, password) values(?, ?, ?); `;
    let getWallet = `select u.username, u.email, w.balance
                  from users as u 
                  inner join wallets as w on w.userid = u.userid
                  where u.userid = ?;`;

    // create user and assign a wallet to the new user with init balance 0
    transaction(pool, async (connection) => {
      const result = await connection.execute(registerUser, [
        this.username,
        this.email,
        this.password,
      ]);
      await connection.execute(
        "insert into wallets(userid, balance) values(?, 0)",
        [result[0].insertId]
      );
    });

    // get user wallet
    const [userid, _] = await pool.execute(
      "select max(userid) as maxid from users"
    );
    const [wallet, __] = await pool.execute(getWallet, [userid[0].maxid]);
    return wallet[0];
  }

  static findAll() {
    let query = `select * from users;`;
    return pool.execute(query);
  }

  static findByEmailID(emailID) {
    let query = `select * from users where email = ?;`;
    return pool.execute(query, [emailID]);
  }
}

module.exports = User;

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // encrypt password before saving in database
// userSchema.pre('save', async function(next){

//     if (!this.isModified('password'))
//         next();

//     // encryp password
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();

// });

// // compare the login password with the password saved in database
// userSchema.methods.matchPasswords = async function(password) {
//     return await bcrypt.compare(password, this.password)
// };

// // create token for user
// userSchema.methods.getSignedToken = function () {
//     return jwt.sign({id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
// };

// // export userSchema so we can use this in other files
// module.exports = mongoose.model("User", userSchema);
