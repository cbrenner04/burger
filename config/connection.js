// require mysql
var mysql = require("mysql");
// configuration for local instances
var dbConfig = {
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD || "",
    database: "burgers_db"
};

// setup the connection
// DATABASE_URL env is set up for heroku
var connection = mysql.createConnection(process.env.DATABASE_URL || dbConfig);

// app is crashing on heroku due to idle timeout. This keeps a connection open
setInterval(function() {
    connection.query('SELECT 1');
}, 5000);

// export the connection
module.exports = connection;
