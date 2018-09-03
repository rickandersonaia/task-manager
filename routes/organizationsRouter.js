var express = require('express');
var organizationsRouter = express.Router();
const cors = require('./cors');
const Organization = require('../models/organization');
const User = require('../models/user');
const authenticate = require('../lib/authenticate');
const authorize = require('../lib/authorize');
const orgTools = require('../lib/organizationFunctions');

// This handles the following routes:
//     /v1/organization/
//     /v1/organization/new
//     /v1/organization/new/initialize
//     /v1/organization/:organizationId

// Get all organizations
organizationsRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        if (req.user.isAdmin === true) {
            Organization.find(req.query,
                (err, organization) => {
                    if (err) {
                        return handleError(err);
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(organization);
                    }
                })
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
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
                }),
                (err, organization) => {
                    if (err) {
                        return handleError(err);
                    }
                    else {
                        console.log('New organization created ', organization);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.json(organization);
                    }
                });
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, message: 'Not authorized'});
        }
    })
; // end organizationsRouter v1/organization/new

// Initialize a new organization
// Allows anyone to create an organization with org-admin user
organizationsRouter.route('/new/initialize')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })

    // creates the route for the add new organization form on the front end
    .get(cors.cors, (req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.send('Howdy');
    })

    // creates a new organization & org-admin user
    // requires name, description, username, email, displayName
    .post(cors.corsWithOptions, (req, res, next) => {
        // first create the organization
        Organization.create(new Organization({
            name: req.body.name,
            description: req.body.description
        }), (err, organization) => {
            if (err) {
                return handleError(err);
            }
            else {
                console.log('New organization created ', organization);
                // second - create the user
                // register takes user.object, password, callback
                User.register(new User({
                        username: req.body.username,
                        email: req.body.email,
                        displayName: req.body.displayName,
                        avatar: req.body.avatar,
                        userRole: 'org-admin',
                        isAdmin: false,
                        organizationId: organization._id
                    }),
                    req.body.password,
                    (err, user) => {
                        if (err) {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({err: err});
                            console.log(req.body.password);
                        }
                        else {
                            // third add the userID to the organization
                            orgTools.addUserIdToOrganization(organization._id, user._id);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/html');
                            res.json(user);
                        }
                    })
            }
        })
    })
; // end organizationsRouter v1/organization/new/initial


// Displays, updates and deletes the organization by organization ID

organizationsRouter.route('/:organizationId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })

    // any organization superuser can view record
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        Organization.findById(req.params.organizationId)
            .then(organization => {
                console.log('orgaini: ', organization);
                if (authorize.hasOrgUserPrivilege(req.user, organization) === true) {
                    console.log('hasOrgUserPrivilege has returned true');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(organization);
                }else{
                    console.log('hasOrgUserPrivilege has returned false');
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, message: 'Not authorized'});
                }
            })
            .catch((err) => {
                console.error(err);
            })
    })

    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /organization/' + req.params.organizationId);
    })

    .put(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        Organization.findById(req.params.organizationId)
            .then(organization => {
                if (authorize.hasOrgAdminPrivilege(req.user, organization) === true) {
                    console.log('hasOrgAdminPrivilege has returned true');
                    Organization.findByIdAndUpdate(req.params.organizationId, {
                        $set: req.body
                    }, {new: true}, (err, organization) => {
                        if (err) {
                            return handleError(err);
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(organization);
                        }
                    })
                }else{
                    console.log('hasOrgAdminPrivilege has returned false');
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, message: 'Not authorized'});
                }
            })
            .catch((err) => {
                console.error(err);
            })
    })

    // app admin can delete organization by organization ID
    .delete(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        Organization.findById(req.params.organizationId)
            .then(organization => {
                if (authorize.hasOrgAdminPrivilege(req.user, organization) === true) {
                    console.log('hasOrgAdminPrivilege has returned true');
                    Organization.findByIdAndRemove(req.params.organizationId,
                        (err, organization) => {
                            if (err) {
                                return handleError(err);
                            } else {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(organization);
                            }
                        })
                }else{
                    console.log('hasOrgAdminPrivilege has returned false');
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, message: 'Not authorized'});
                }
            })
            .catch((err) => {
                console.error(err);
            })
    })
; // end organizationsRouter v1/organization/:organizationId


module.exports = organizationsRouter;
