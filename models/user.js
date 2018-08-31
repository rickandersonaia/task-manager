var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
        email: {
            type: String,
            required: false,
            unique: false,
        },
        displayName: {
            type: String,
            required: true,
            unique: false,
        },
        avatar: {
            type: String,
            required: false,
            unique: false
        },
        organizationId: {
            type: String,
            required: true,
            unique: false
        },
        userRole: {  // choices are admin, org-admin, org-superuser, org-user
            type: String,
            required: true,
            unique: false,
            default: "org-user"
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        projects: [{projectId: String}],
    },
    {
        timestamps: true
    }
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);