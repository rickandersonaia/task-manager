var express = require('express');
var teamsRouter = express.Router();
const mongoose = require('mongoose');
const cors = require('./cors');
const Task = require('../models/task');
const passport = require('passport');
const authenticate = require('../lib/authenticate');

// Get all teams - probably not useful
// TODO: '/' route, authorization - app admins

// Get all teams for a specific organization
// TODO: '/:organizationId' route, authorization - app admins, organization org-admin, organization org-superuser

// Get all teams for a specific user
// TODO: '/:userId' route, authorization - app admins, organization org-admin, organization org-superuser, organization org-users

// Get new team route
// TODO: '/new' route, authorization - app admins, org-admin, org-superuser

// Post a new team
// TODO: '/new' route, authorization - app admins, org-admin, org-superuser

// Get a specific team
// TODO: '/:teamId' route, authorization - app admins, organization org-admin, organization org-superuser, organization org-users

// Update (put) a specific team
// TODO: '/:teamId' route, authorization - app admins, organization org-admin

// Delete a specific team
// TODO: '/:teamId' route, authorization - app admins, organization org-admin


module.exports = teamsRouter;
