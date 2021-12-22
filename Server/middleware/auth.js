const jwt = require("jsonwebtoken");
const User = require("../models/User");

// this function will use to protect routes
exports.protect = async (req, res, next) => {
  // take token from request body
  let token;

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
    // let check any user exist with this email
    const [user, _] = await User.findByEmailId(decodedToken.email);
    // check if we found any user with given email
    if (!user[0])
      return res
        .status(404)
        .json({ success: false, message: "No user found with this email" });
    // set req.user with this user
    req.user = user[0];
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
