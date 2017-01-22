// require mysql
var mysql = require("mysql");

// setup the connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD || "",
    database: "burgers_db"
});

// connect to the database
connection.connect(function(error) {
    if (error) {
        console.error("error connecting: " + error.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// export the connection
module.exports = connection;
