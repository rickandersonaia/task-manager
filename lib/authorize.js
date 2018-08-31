const User = require('../models/user');
const Organization = require('../models/organization');

exports.hasOrgAdminPrivilege = function (master, slaveId) {
    if(master.isAdmin === true){
        return true;
    };
    Organization.findById(slaveId)
        .then((organization) => {
            if(organization.owner === master._id){
                return true;
            }
        }, (err) => next(err))
        .catch((err) => next(err));

    return false;
};

exports.hasOwnerPrivilege = function (master, slaveId) {
    if(master.isAdmin === true){
        return true;
    };
    Organization.findById(slaveId)
        .then((organization) => {
            if(organization.owner === master._id){
                return true;
            }
        }, (err) => next(err))
        .catch((err) => next(err));

    return false;
};