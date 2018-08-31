var express = require('express');
var attachmentsRouter = express.Router();

// Get all attachments
// TODO: '/' route, authorization - app admins

// Get new attachment route
// TODO: '/new' route, authorization - verified user

// Post a new attachment
// TODO: '/new' route, authorization - project team members

// Get a specific attachment
// TODO: '/:attachmentId', authorization - app admins, project owner (member-superuser), project team members

// Delete a specific attachment
// TODO: '/:attachmentId', authorization - app admins, project owner (member-superuser), project team members

// Get all project attachments
// TODO: '/:projectId', authorization - app admins, project owner (member-superuser), project team members

// Get all task attachments
// TODO: '/:taskId', authorization - app admins, project owner (member-superuser), project team members

// Get all user attachments
// TODO: '/:userId', authorization - app admins, project owner (member-superuser), project team members

module.exports = attachmentsRouter;
