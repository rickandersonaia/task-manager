var express = require('express');
var organizationsRouter = express.Router();
const mongoose = require('mongoose');
const cors = require('./cors');
const Task = require('../models/task');
const passport = require('passport');
const authenticate = require('../lib/authenticate');

// Get all organizations
// TODO: '/' route, authorization - app admins

// Get new organization route
// TODO: '/new' route, authorization - app admins

// Post a new organization
// TODO: '/new' route, authorization - app admins

// Get a specific organization
// TODO: '/:organizationId' route, authorization - app admins, organization org-admin, organization org-superuser, organization org-users

// Update (put) a specific organization
// TODO: '/:organizationId' route, authorization - app admins, organization org-admin

// Delete a specific organization
// TODO: '/:organizationId' route, authorization - app admins, organization org-admin


module.exports = organizationsRouter;
