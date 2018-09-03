const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const User = require('../models/user');
const Organization = require('../models/organization');
const passport = require('passport');
const authenticate = require('../lib/authenticate');

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

// This handles the following routes:
//     /v1/user/
//     /v1/user/new
//     /v1/user/:userId

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
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, status: 'Registration Successful!'});
                    }
                });
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })
; // end usersRouter v1/users/new


// Displays, updates and deletes the user by user ID
usersRouter.route('/:userId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })

    // any registered user can retrieve the user record if they are a member of the same organization
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        User.findById(req.params.userId)
            .then((user) => {
                if (req.user.isAdmin === true || req.user.organizationId === user.organizationId) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                } else {
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, message: 'Not authorized'});
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /users/' + req.params.userId);
    })

    // user records can be changed by the user, the app admin, org-admin and the org-superuser
    .put(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (req.user.isAdmin === true
            || req.user.userRole === 'org-admin'
            || req.user.userRole === 'org-superuser'
            || req.user._id === req.params.userId) {
            User.findById(req.params.userId)
                .then((user) => {
                    if (req.user.organizationId === user.organizationId) {
                        //TODO: insert logic to ensure that userRole change can only be done by app admins and org-admins
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
                    }
                }, (err) => next(err))
                .catch((err) => next(err));

        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
        }
    })

    // user records can be deleted by app admin, org-admin and specific user
    .delete(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (req.user.isAdmin === true
            || req.user.userRole === 'org-admin'
            || req.user._id === req.params.userId) {
            User.findById(req.params.userId)
                .then((user) => {
                    if (req.user.organizationId === user.organizationId) {
                        //TODO: insert logic to reassign projects and tasks for deleted users, remove from teams & organizations
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
                    }
                }, (err) => next(err))
                .catch((err) => next(err));

        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
        }
    })
; // end usersRouter v1/users/:userId


module.exports = usersRouter;
