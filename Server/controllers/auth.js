const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // extract data from request body
    let { username, email, password } = req.body;

    // check username, email and password
    // any of these shouldn't be empty
    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "user information shouldn't be empty",
      });
    }

    // check whether email is valid or not
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!regex.test(email)) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    // check password length
    if (password.length > 14 || password.length < 7) {
      return res.json({
        success: false,
        message: "password should be 8 to 15 characters long",
      });
    }

    // if the email already exist
    let [found, _] = await User.findByEmailId(email);
    if (found.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: `email already exist` });
    }

    // register user
    const user = new User(username, email, password);
    await user.save();
    // if user saved successfully\
    return res.status(201).json({
      success: true,
      message: `${username}, you registered successfully`,
    });
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

exports.forgetPassword = async (req, res, next) => {
  // extract email from request body
  const { email } = req.body;
  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "Provide email to reset the password" });
  }
  try {
    // check if any user exist with this email
    const [user, _] = await User.findByEmailId(email);
    // if not user found
    if (user[0] > 0) {
      return res
        .status(404)
        .json({ success: false, message: "email could not be send" });
    }
    // logging data
    console.log(user[0]);
    const response = await sendEmail(user[0].Email);
    if (!response) {
      // don't show full email
      let emailAddress = user[0].Email.split("@")[0];
      emailAddress = emailAddress.slice(0, 5);
      emailAddress += ".....@" + user[0].Email.split("@")[1];
      const token = await User.getResetPasswordToken(user[0]);
      return res.status(200).json({
        success: true,
        message: `email sent at ${emailAddress}`,
        resetToken: token,
      });
    }
  } catch (error) {
    console.log("its error - ", error.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { email, newPassword } = req.body;

  // check email and password is not empty
  if (!email || !newPassword) {
    return res
      .status(404)
      .json({ message: "Please provide email and new password" });
  }

  // extract token from body
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // check token isn't empty
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Access" });
  }
  try {
    // verify the token
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    // i used user email as token, so decoding the token will give us user email
    if (email === decodedToken.email) {
      await User.updatePassword(email, newPassword);
      res.status(200).json({ success: true, message: "password updated" });
    }
  } catch (error) {
    if (error.message === "jwt malformed")
      return res
        .status(500)
        .json({ success: false, message: "Unauthorized Access" });

    res.status(500).json({ success: false, message: error.message });
  }
};

const sendToken = (user, statusCode, res) => {
  res
    .status(statusCode)
    .json({ success: true, token: User.getSignedToken(user) });
};
