/* globals __dirname */
const express = require('express');
const passport = require('passport');
var cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');
const auth = require('../config/auth.config');

const init = (data) => {
    const app = express();
    const server = require('http').Server(app);
    const usersController = require('./controllers/users.controller')(data);
    const requestsController = require('./controllers/requests.controller')(data);
    const booksController = require('./controllers/books.controller')(data);    
    
    app.use('/libs', express.static('node_modules'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());
    app.use(cors());

    auth.init(app, data, passport);

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
    app.post('/register', usersController.register);

    // User Profile Sections
    app.get('/users/:username', usersController.getUserProfile);
    app.put('/users/:username', auth.authenticate(passport), usersController.updateUserProfile);

    // Book collections of User
    app.get('/users/:id/reading', usersController.getReadingBooks);
    app.get('/users/:id/wishlist', usersController.getWishlist);
    app.get('/users/:id/read', usersController.getReadBooks);  

    // Friends of User
    app.get('/users/:id/friends', usersController.getUserFriends);

    // Comments of User
    app.get('/users/:id/comments', usersController.getUserComments); 
    app.delete('/users/:userId/comments/:commentId', auth.authenticate(passport), usersController.deleteComment);  
    
    // Reviews of User
    app.get('/users/:id/reviews', usersController.getUserReviews);
    app.delete('/users/:userId/reviews/:reviewId', auth.authenticate(passport), usersController.deleteReview);

    // Events of User
    app.get('/users/:id/events', usersController.getUserEvents);                                                  
    app.get('/users/:id/joinedevents', usersController.getJoinedEvents);                  
    
    // Requests of User
    app.get('/users/:id/requests', auth.authenticate(passport), requestsController.getPendingUserRequests);
    app.post('/users/:id/requests', auth.authenticate(passport), requestsController.sendRequests);
    app.put('/requests/:id', auth.authenticate(passport), requestsController.acceptRequest);            
    app.delete('/requests/:id', auth.authenticate(passport), requestsController.declineRequest);            
                
    // Books
    app.get('/books', auth.authenticate(passport), booksController.getAllBooks);    
    app.get('/books/:title', booksController.getBook);
    app.post('/books/:title/reviews', auth.authenticate(passport), booksController.addReview);
    app.put('/books/:id/rating', auth.authenticate(passport), booksController.rateBook);
    app.put('/books/:id/statuses', auth.authenticate(passport), booksController.markBook);
    app.get('/recommendedbooks', auth.authenticate(passport), booksController.getRecommendedBooks);
    app.get('/latestbooks', booksController.getLatestBooks);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    
    return Promise.resolve(server);
};

module.exports = {
    init,
};