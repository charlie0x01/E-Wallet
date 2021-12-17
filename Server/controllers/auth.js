const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    // extract data from request body
    const { username, email, password } = req.body;

    // check username, email and password
    // any of these shouldn't be empty
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!username || !email || !password)
      return res.status(401).json({ message: "there shouldn't be any empty" });

    // check whether email is valid or not
    if (!regex.test(email))
      return res.status(401).json({ mesage: "Invalid Email" });

    // check password length
    if (password.length > 14 || password.length < 7)
      return res.json({
        message: "password should be 8 to 15 characters long",
      });

    // if the email already exist
    let [found, _] = await User.findByEmailID(email);
    if (found.length > 0)
      return res.status(403).json({ mesage: `email already exist` });

    // register user
    let user = new User(username, email, password);
    const [response, __] = await user.save();
    // if user saved successfully
    if (response.warningStatus === 0)
      return res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res, next) => {
  // 1st extract email and password from request body
  const { email, password } = req.body;

  // check email and password is not empty
  if (!email || !password)
    return res.status(404).send("Please provide email and password");
};

exports.forgetPassword = (req, res, next) => {
  res.send("forget password");
};

exports.resetPassword = (req, res, next) => {
  res.send("reset password");
};

// const sendToken = (user, statusCode, res) => {
//     res.status(statusCode).json({ success: true, token: user.getSignedToken() });
// };
