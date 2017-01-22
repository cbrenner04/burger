// require mysql
var mysql = require("mysql");

// setup the connection
var connection = mysql.createConnection({
    host: process.env.HOST || "localhost",
    user: process.env.USERNAME || "root",
    password: process.env.PASSWORD || "",
    database: process.env.DB || "burgers_db"
});

// export the connection
module.exports = connection;
