var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Attachment = new Schema({
        projectId: {
            type: String,
            required: true,
            unique: false,
        },
        taskId: {
            type: String,
            required: true,
            unique: false,
        },
        description: {
            type: String,
            required: false,
            unique: false,
        },
        mimeType: {
            type: String,
            required: false,
            unique: false,
        },
        location: {
            type: String,
            required: true,
            unique: false,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Attachment', Attachment);