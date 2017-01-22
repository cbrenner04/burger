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
function burgers() {
    return new Promise(function(resolve, reject) {
        var object = {};
        return uneatenBurgers()
            .then(function(data) {
                object.uneaten = data;
                return eatenBurgers()
                    .then(function(data) {
                        object.eaten = data;
                        return resolve(object);
                    })
                    .catch(function(error) {
                        return reject(error);
                    });
            })
            .catch(function(error) {
                return reject(error);
            });
    });
}

// query the database for uneaten burgers
function uneatenBurgers() {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM burgers WHERE devoured = false',
            function(error, data) {
                if (error) reject(error);
                return resolve(data);
            });
    });
}

// query the database for eaten burgers
function eatenBurgers() {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM burgers WHERE devoured = true',
            function(error, data) {
                if (error) reject(error);
                return resolve(data);
            });
    });
}

// query the database for single burger
function singleBurger(burger) {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM burgers WHERE id = ?', [burger],
            function(error, data) {
                if (error) reject(error);
                return resolve(data);
            });
    });
}

// query the database to create a burger
function create(burger) {
    return new Promise(function(resolve, reject) {
        connection
            .query("INSERT INTO burgers (burger_name) VALUES (?)", [burger],
                function(error, result) {
                    if (error) reject(error);
                    return resolve();
                });
    });
}

// query the database to update a burger
function update(burger) {
    return new Promise(function(resolve, reject) {
        connection
            .query("UPDATE burgers SET devoured = true WHERE id = ?", [burger],
                function(error, result) {
                    if (error) reject(error);
                    return resolve();
                });
    });
}
