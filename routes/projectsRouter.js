var express = require('express');
var projectsRouter = express.Router();
const mongoose = require('mongoose');
const cors = require('./cors');
const Project = require('../models/project');
const passport = require('passport');
const authenticate = require('../authenticate');

// Get all projects
// TODO: '/' route, authorization - app admins

// Get new project route
// TODO: '/new' route, authorization - app admins, org-admin, org-superuser

// Post a new project
// TODO: '/new' route, authorization - app admins, org-admin, org-superuser

// Get a specific project
// TODO: '/:projectId' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Update (put) a specific project
// TODO: '/:projectId' route, authorization - app admins, org-admin, project owner (org-superuser), project team members

// Delete a specific project
// TODO: '/:projectId' route, authorization - app admins, org-admin, project owner

// Get all projects for a specific organization
// TODO: '/:organizationId' route, authorization - app admins, org-admin, org-superuser

// Get queried projects for a specific organization
// TODO: '/:organizationId?completed=true' route, authorization - app admins, org-admin, org-superuser

// Get all projects for a specific team
// TODO: '/:teamId' route, authorization - app admins, org-admin, org-superuser, team members

// Get queried projects for a specific team
// TODO: '/:teamId?completed=true' route, authorization - app admins, org-admin, org-superuser, team members

// Get all projects for a specific user - My Projects
// TODO: '/:userId' route, authorization - app admins, org-admin, org-superuser, specific org-user

// Get queried projects for a specific user - My Projects
// TODO: '/:userId?completed=true' route, authorization - app admins, org-admin, org-superuser, specific org-user


module.exports = projectsRouter;
