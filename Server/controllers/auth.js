const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    // extract data from request body
    let { username, email, password } = req.body;

    // check username, email and password
    // any of these shouldn't be empty
    if (!username || !email || !password) {
      return res
        .status(401)
        .json({ message: "user information shouldn't be empty" });
    }

    // check whether email is valid or not
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(email)) {
      return res.status(401).json({ mesage: "Invalid Email" });
    }

    // check password length
    if (password.length > 14 || password.length < 7) {
      return res.json({
        message: "password should be 8 to 15 characters long",
      });
    }

    // if the email already exist
    let [found, _] = await User.findByEmailId(email);
    if (found.length > 0) {
      return res.status(403).json({ mesage: `email already exist` });
    }

    // register user
    const user = new User(username, email, password);
    await user.save();
    // if user saved successfully\
    return res
      .status(201)
      .json({ message: `${username}, you registered successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res, next) => {
  // 1st extract email and password from request body
  const { email, password } = req.body;

  // check email and password is not empty
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Please provide email and password" });
  }

  try {
    const [user, _] = await User.findByEmailId(email);
    // check, if we have any user with this email
    if (!user[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // check password
    const isMatched = await User.matchPassword(user[0], password);
    // if not matched
    if (!isMatched) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });
    }

    // send token
    sendToken(user[0], 200, res);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.forgetPassword = (req, res, next) => {
  res.send("forget password");
};

const sendToken = (user, statusCode, res) => {
  res
    .status(statusCode)
    .json({ success: true, token: User.getSignedToken(user) });
};
