var express = require('express');
var tasksRouter = express.Router();
const mongoose = require('mongoose');
const cors = require('./cors');
const Task = require('../models/task');
const passport = require('passport');
const authenticate = require('../lib/authenticate');

// Get all tasks - this one is useless, probably should kill this one
// TODO: '/' route, authorization - app admins

// Get new task route
// TODO: '/new' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Post a new task
// TODO: '/new' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Get a specific task
// TODO: '/:taskId' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Update (put) a specific task
// TODO: '/:taskId' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Delete a specific task
// TODO: '/:taskId' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Get tasks by project
// TODO: '/:projectId' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Get queried tasks by project
// TODO: '/:projectId?completed=true' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Get tasks by user
// TODO: '/:userId' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Get queried tasks by user
// TODO: '/:userId?completed=true' route, authorization - app admins, org-admin, project owner (org-superuser), project team members



module.exports = tasksRouter;
