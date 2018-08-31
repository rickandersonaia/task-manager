var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');


var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/home');
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
    // add email verification to this
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
                console.log(err);
                return next(err);
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                    // res.redirect('/home');
                });
            }
        });
});

//TODO: Create a graceful response to duplicate registration & incomplete information


router.options('*', cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
})

router.post('/login', cors.corsWithOptions, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('pre-login error');
            return next(err);
        }

        req.logIn(user, (err) => {
            if (err) {
                console.log('login error');
                return next(err)
            }
            var token = authenticate.getToken({_id: req.user._id});
            let currentUser = { // create a new user object without security elements
                _id: user._id,
                username: user.username,
                displayName: user.displayName,
                email: user.email,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                userRole: user.userRole,
                organizationId: user.organizationId
            };
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                token: token,
                user: currentUser
            });
            // res.json({...user._doc, token})
        })
    })(req, res, next);
});


router.get('/logout', cors.corsWithOptions, (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

router.get('/checkJWTToken', cors.corsWithOptions, (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            return res.json({status: 'JWT invalid!', success: false, err: info});
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({status: 'JWT valid!', success: true, user: user});

        }
    })(req, res);
});

router.route('/duplicate-check')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        User.findOne(req.query)
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({notunique: true, username: user.username});
            }, (err) => next(err))
            .catch((err) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({notunique: false});
            });

    })
; // end /duplicate-check

module.exports = router;
