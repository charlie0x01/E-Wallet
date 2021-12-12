const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.register = (req, res, next) => {
    
    // extract data from request body
    const {username, email, password } = req.body;

    // check whether user already exist
    User.findOne({email: email})
    .then((user) => {
        if(user)
            return next(new ErrorResponse("User with this email already exist", 409));
        // User.create will automatically create user object and then save it in database
        // it returns a promise
        User.create({
            username,
            email,
            password
        })
        .then((user) => {
            sendToken(user, 201, res);
        })
        .catch((error) => {
            next(error);
        });
    })
    .catch((error) => {
        next(error);
    });
};

exports.login = (req, res, next) => {
    
    // 1st take email and password from requ est
    const { email, password } = req.body;

    // check whether email and password is not empty
    if(!email || !password)
        return next(new ErrorResponse("Please provide email and password", 404));

    User.findOne({ email }).select("+password")
    .then((user) => {

        if(!user)
            return next(new ErrorResponse("Invalid Credentials", 401)); 

        user.matchPasswords(password)
        .then((isMatched) => {
            if(!isMatched)
                return next(new ErrorResponse("Invalid Credentials", 401)); 
            
            sendToken(user, 200, res);
        })
    })
    .catch((error) => {
        next(error);
    });
};

exports.forgetPassword = (req, res, next) => {
    res.send("forget password");
};

exports.resetPassword = (req, res, next) => {
    res.send("reset password");
};

const sendToken = (user, statusCode, res) => {
    res.status(statusCode).json({ success: true, token: user.getSignedToken() });
};