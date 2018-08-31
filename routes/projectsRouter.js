var express = require('express');
var projectsRouter = express.Router();

// Get all projects
// TODO: '/' route, authorization - app admins

// Get new project route
// TODO: '/new' route, authorization - app admins, member-admin, member-superuser

// Post a new project
// TODO: '/new' route, authorization - app admins, member-admin, member-superuser

// Get a specific project
// TODO: '/:projectId' route, authorization - app admins, member-admin, project owner (member-superuser), project team members

// Update (put) a specific project
// TODO: '/:projectId' route, authorization - app admins, member-admin, project owner (member-superuser), project team members

// Delete a specific project
// TODO: '/:projectId' route, authorization - app admins, member-admin, project owner

// Get all projects for a specific team
// TODO: '/:teamId' route, authorization - app admins, member-admin, team members

// Get all projects for a specific user - My Projects
// TODO: '/:userId' route, authorization - app admins, member-admin, specific member-user


module.exports = projectsRouter;
