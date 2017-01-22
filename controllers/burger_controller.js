// require express and the burgers model
var express = require('express');
var burgers = require('../models/burger.js');

// export the routes
module.exports = function(app) {
    // get the root route
    app.get('/', function(request, response) {
        burgers.allBurgers()
            .then(function(data) {
                response.render('index', {
                    uneatenBurgers: data.uneaten,
                    eatenBurgers: data.eaten
                });
            })
            .catch(function(error) {
                throw error;
            });
    });

    // define the get api/burgers route - for all burger data
    app.get('/api/burgers', function(request, response) {
        burgers.allBurgers()
            .then(function(data) {
                response.json(data);
            })
            .catch(function(error) {
                throw error;
            });
    });

    // define post for creating a burger
    app.post('/', function(request, response) {
        var newBurger = request.body.burger;
        // if no burger is defined just return
        if (newBurger === '') {
            response.redirect('/');
            return;
        }
        // create that burger
        burgers.create(request.body.burger)
            .then(function() {
                response.redirect('/');
            })
            .catch(function(error) {
                throw error;
            });
    });

    // define the get api/burgers/:id route - for single burger data
    app.get('/api/burgers/:id', function(request, response) {
        burgers.singleBurger(request.params.id)
            .then(function(data) {
                response.json(data);
            })
            .catch(function(error) {
                throw error;
            });
    });

    // define put for updating a burger
    app.put('/:id', function(request, response) {
        burgers.update(request.params.id)
            .then(function() {
                response.redirect('/');
            })
            .catch(function(error) {
                throw error;
            });
    });
};
