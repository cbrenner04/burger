// require the database connection
var connection = require('../config/connection.js');

// export the model
module.exports = {
    allBurgers: burgers,
    create: create,
    singleBurger: singleBurger,
    update: update
};

// get all the burgers -- an object is returned with uneaten and eaten burgers
function burgers(callBack) {
    var object = {};
    uneatenBurgers(function(data) {
        object.uneaten = data;
        eatenBurgers(function(data) {
            object.eaten = data;
            callBack(object);
        });
    });
}

// query the database for uneaten burgers
function uneatenBurgers(callBack) {
    connection.query('SELECT * FROM burgers WHERE devoured = false',
        function(error, data) {
            if (error) throw error;
            callBack(data);
        });
}

// query the database for eaten burgers
function eatenBurgers(callBack) {
    connection.query('SELECT * FROM burgers WHERE devoured = true',
        function(error, data) {
            if (error) throw error;
            callBack(data);
        });
}

// query the database for single burger
function singleBurger(burger, callBack) {
    connection.query('SELECT * FROM burgers WHERE id = ?', [burger],
        function(error, data) {
            if (error) throw error;
            callBack(data);
        });
}

// query the database to create a burger
function create(burger, callBack) {
    connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [burger],
        function(error, result) {
            if (error) throw error;
            callBack();
        });
}

// query the database to update a burger
function update(burger, callBack) {
    connection
        .query("UPDATE burgers SET devoured = true WHERE id = ?", [burger],
            function(error, result) {
                if (error) throw error;
                callBack();
            });
}
