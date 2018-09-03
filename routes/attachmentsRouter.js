var express = require('express');
var attachmentsRouter = express.Router();

// Get all attachments - probably useless and should be removed
// TODO: '/' route, authorization - app admins

// Get new attachment route
// TODO: '/new' route, authorization - verified user

// Post a new attachment
// TODO: '/new' route, authorization - project owner (member-superuser), project team members

// Get a specific attachment
// TODO: '/:attachmentId', authorization - app admins, project owner (member-superuser), project team members

// Delete a specific attachment
// TODO: '/:attachmentId', authorization - app admins, project owner (member-superuser), project team members

// Get all project attachments
// TODO: '/:projectId', authorization - app admins, project owner (member-superuser), project team members

// Get queried project attachments
// TODO: '/:projectId?mime-type=image/jpeg', authorization - app admins, project owner (member-superuser), project team members

// Get all task attachments
// TODO: '/:taskId', authorization - app admins, project owner (member-superuser), project team members

// Get queried task attachments
// TODO: '/:taskId?mime-type=image/jpeg', authorization - app admins, project owner (member-superuser), project team members

module.exports = attachmentsRouter;
