var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Organization = new Schema({
        name: {
            type: String,
            required: true,
            unique: false,
        },
        description: {
            type: String,
            required: false,
            unique: false,
        },
        owner: {
            type: String,
            required: false,
            unique: false
        },
        members: [{
            memberId: String
        }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Organization', Organization);