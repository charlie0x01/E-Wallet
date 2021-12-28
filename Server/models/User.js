require("dotenv").config();
const { pool, transaction } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {
    // create a query to register user in database
    // after registering new user, we will create a new wallet for the new user
    let registerUser = `insert into users(username, email, password) values(?, ?, ?); `;
    try {
      // encrypt password before saving in database
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(this.password, salt, (error, hash) => {
          // create user and assign a wallet to the new user with init balance 0
          transaction(pool, async (connection) => {
            const result = await connection.execute(registerUser, [
              this.username,
              this.email,
              hash,
            ]);
            await connection.execute(
              "insert into wallets(userid, balance) values(?, 0)",
              [result[0].insertId]
            );
          });
        });
      });
    } catch (error) {
      throw error;
    }
  }
  static updatePassword(email, newPassword) {
    // update user password in database
    let updatePass = `update users set password = ? where email = ? `;
    try {
      // encrypt password before saving in database
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(this.password, salt, (error, hash) => {
          transaction(pool, async (connection) => {
            await connection.execute(updatePass, [newPassword, email]);
          });
        });
      });
    } catch (error) {
      throw error;
    }
  }

  static findAll() {
    let query = `select * from users;`;
    return pool.execute(query);
  }

  static findByEmailId(emailID) {
    let query = `select * from users where email = ?;`;
    return pool.execute(query, [emailID]);
  }

  static matchPassword(user, userPassword) {
    // compare the registered password with login password
    return bcrypt.compare(userPassword, user.Password);
  }

  static getSignedToken(user) {
    return jwt.sign({ email: user.Email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  static getResetPasswordToken(user) {
    return jwt.sign({ email: user.Email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
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
