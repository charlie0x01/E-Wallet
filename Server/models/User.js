const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Please provide valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: 6,
        select: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

});

// encrypt password before saving in database
userSchema.pre('save', async function(next){

    if (!this.isModified('password')) 
        next();

    // encryp password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    
});

// compare the login password with the password saved in database
userSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
};

// create token for user
userSchema.methods.getSignedToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// export userSchema so we can use this in other files
module.exports = mongoose.model("User", userSchema);