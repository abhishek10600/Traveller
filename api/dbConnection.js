const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    host: process.env.db_host,
    password: "",
    database: "travelblog"
})

module.exports = db;