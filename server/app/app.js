/* globals __dirname */
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');

const init = (data) => {
    const app = express();
    const server = require('http').Server(app);
    const usersController = require('./controllers/users.controller')(data);
    
    app.use('/libs', express.static('node_modules'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());

    require('../config/auth.config')(app, data, passport);

    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });
    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    app.post('/login', usersController.login);
    
    return Promise.resolve(server);
};

module.exports = {
    init,
};