var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Task = new Schema({
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
        projectId: {
            type: String,
            required: true,
            unique: false,
        },
        parentId: {
            type: String,
            required: true,
            unique: false,
        },
        assignedToId: {
            type: String,
            required: true,
            unique: false,
        },
        description: {
            type: String,
            required: false,
            unique: false,
        },
        dueDate: {type: Date},
        members: [{memberId: String}],
        history: [{memberId: String, date: Date}],
        comments: [{memberId: String, date: Date, comment_body: String}],
        attachments: [{attachmentId: String}],
        dependentOn: [{taskId: String}],
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', Project);Task