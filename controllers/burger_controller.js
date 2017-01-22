var express = require('express');
var burgers = require('../models/burger.js');

module.exports = function(app) {
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

    app.post('/', function(request, response) {
        var newBurger = request.body.burger;
        if (newBurger === '') {
            response.redirect('/');
            return;
        }
        burgers.create(request.body.burger)
            .then(function() {
                response.redirect('/');
            })
            .catch(function(error) {
                throw error;
            });
    });

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
