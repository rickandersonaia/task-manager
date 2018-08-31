var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Project = new Schema({
        name: {
            type: String,
            required: false,
            unique: false,
        },
        ownerId: {
            type: String,
            required: true,
            unique: false,
        },
        organizationId: {
            type: String,
            required: true,
            unique: false,
        },
        teamId: {
            type: String,
            required: false,
            unique: false,
        },
        description: {
            type: String,
            required: false,
            unique: false,
        },
        status: {
            type: String, // Options are live or template
            required: false,
            unique: false,
        },
        members: [{
            memberId: String
        }],
        history: [{
            memberId: String,
            date: Date
        }],
        comments: [{
            memberId: String,
            date: Date,
            comment_body: String
        }],
        tasks: [{
            taskId: String
        }],
        attachments: [{
            attachmentId: String
        }],
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Project', Project);