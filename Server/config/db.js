require("dotenv").config(".env");
const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MongoDBURI)
        .then((result) => console.log("DB Connected 👍"))
        .catch((err) => console.log("something went wrong with DB connection!!"))
};


module.exports = connectDB;