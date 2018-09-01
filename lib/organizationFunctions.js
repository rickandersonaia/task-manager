
const Organization = require('../models/organization');

// Adds userId to Organization.members object

exports.addUserIdToOrganization = function (organizationId, userId) {
    Organization.findByIdAndUpdate(organizationId, {
        $push: {members: {memberId: userId}}
    }, {new: true})
        .then((organization) => {
            return organization;
        }, (err) => next(err))
        .catch((err) => next(err));
};

