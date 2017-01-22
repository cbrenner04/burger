var connection = require('../config/connection.js');

module.exports = {
    allBurgers: burgers,
    create: create,
    update: update
};

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

function uneatenBurgers() {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM burgers WHERE devoured=false',
            function(error, data) {
                if (error) reject(error);
                return resolve(data);
            });
    });
}

function eatenBurgers() {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM burgers WHERE devoured=true',
            function(error, data) {
                if (error) reject(error);
                return resolve(data);
            });
    });
}

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
