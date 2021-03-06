var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Team = new Schema({
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
        organizationId: {
            type: String,
            required: true,
            unique: false,
        },
        members: [{
            memberId: String
        }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Team', Team);