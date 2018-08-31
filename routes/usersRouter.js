const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const User = require('../models/user');
const Organization = require('../models/organization')
const passport = require('passport');
const authenticate = require('../authenticate');

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

// returns all users to the app administrators
usersRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        if (req.user.isAdmin === true) {
            User.find(req.query)
                .then((users) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(users);
                }, (err) => next(err))
                .catch((err) => next(err));
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })
; // end


// Allows an app admin to manually create a user
usersRouter.route('/new')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })

    // creates the route for the add new user form on the front end
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        if (req.user.isAdmin === true) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.send('Howdy');
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })

    // creates the new user - if the app admin
    .post(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (req.user.isAdmin === true) {
            User.register(new User({
                    username: req.body.username,
                    email: req.body.email,
                    displayName: req.body.displayName,
                    avatar: req.body.avatar,
                    userRole: req.body.userRole,
                    isAdmin: req.body.isAdmin,
                    organizationId: req.body.organizationId
                }),
                req.body.password, (err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({err: err});
                        console.log(req.body.password);
                    }
                    else {
                        passport.authenticate('local')(req, res, () => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({success: true, status: 'Registration Successful!'});
                        });
                    }
                });
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })
; // end usersRouter users/new


// Displays or deletes the user by user ID
usersRouter.route('/:userId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })

    // any registered user can retrieve the user record
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        User.findById(req.params.userId)
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /users/' + req.params.userId);
    })

    // app admin can delete user by user ID
    .delete(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (req.user.isAdmin === true) {
            User.findByIdAndRemove(req.params.userId)
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })
; // end usersRouter users/:userId



usersRouter.route('/edit/:userId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        if (req.user.isAdmin === true || req.user._id === req.params.userId) {
            User.findById(req.params.userId)
                .then((user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                }, (err) => next(err))
                .catch((err) => next(err));
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /users/edit/' + req.params.userId);
    })
    .put(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (req.user.isAdmin === true || req.user._id === req.params.userId) {
            User.findByIdAndUpdate(req.params.userId, {
                $set: req.body
            }, {new: true})
                .then((user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                }, (err) => next(err))
                .catch((err) => next(err));
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })
    .delete(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (req.user.isAdmin === true) {
            User.findByIdAndRemove(req.params.userId)
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    });
; // end usersRouter admin/users/edit/:userId


module.exports = usersRouter;
