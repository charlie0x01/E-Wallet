require("dotenv").config(".env");
const mysql = require("mysql2");

// connecting database
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD 
});

// exporting pool
module.exports = pool.promise();