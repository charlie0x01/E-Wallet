const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// this function will use to protect routes
exports.protect = (req, res, next) => {
    // take token from request body
    let token;

    // extract token from body
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];
    
    // check token isn't empty
    if(!token)
        return next(new ErrorResponse("Token Missing - Unauthorized Access", 401));

    // verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // i used user id as token, so decoding the token will give us user id
    // let check any user exist with this id
    User.findById(decodedToken.id)
    .then((user) => {
        // check user
        if(!user)
            return next(new ErrorResponse("No user found with this id", 404));
        // set req.user with this user
        req.user = user;
        next();
    })
    .catch((error) => {
        return next(new ErrorResponse("Unauthorized access", 401));
    });
}