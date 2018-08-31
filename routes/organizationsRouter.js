var express = require('express');
var organizationsRouter = express.Router();
const cors = require('./cors');
const Organization = require('../models/organization');
const authenticate = require('../lib/authenticate');
const authorize = require('../lib/authorize')

// Get all organizations
organizationsRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        if (req.user.isAdmin === true) {
            Organization.find(req.query)
                .then((organizations) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(organizations);
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

// Get new organization route or create a new organization
// Allows an app admin to manually create an organization
organizationsRouter.route('/new')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })

    // creates the route for the add new organization form on the front end
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

    // creates a new organization - if the app admin
    .post(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (req.user.isAdmin === true) {
            Organization.create(new Organization({
                name: req.body.name,
                description: req.body.description,
                owner: req.user._id,
                members: [{memberId: req.user._id}]
            }))

                .then((organization) => {
                    console.log('New organization created ', organization);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.json(organization);
                }, (err) => next(err))

                .catch((err) => next(err));

        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })
; // end organizationsRouter organization/new


// Displays, updates and deletes the user by user ID
organizationsRouter.route('/:organizationId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })

    // any registered user can retrieve the user record
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        if (authorize.hasOrgAdminPrivilege(req.user, req.params.organizationId)) {
        Organization.findById(req.params.organizationId)
            .then((organization) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(organization);
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
        res.end('POST operation not supported on /organization/' + req.params.organizationId);
    })

    .put(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (authorize.hasOrgAdminPrivilege(req.user, req.params.organizationId)) {
            Organization.findByIdAndUpdate(req.params.organizationId, {
                $set: req.body
            }, {new: true})
                .then((organization) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(organization);
                }, (err) => next(err))
                .catch((err) => next(err));
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
            res.end();
        }
    })

    // app admin can delete organization by organization ID
    .delete(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        if (authorize.hasOrgAdminPrivilege(req.user, req.params.organizationId)) {
            Organization.findByIdAndRemove(req.params.organizationId)
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
; // end usersRouter users/:organizationId


module.exports = organizationsRouter;
