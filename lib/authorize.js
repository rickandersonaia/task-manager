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

exports.hasOrgSuperUserPrivilege = function (master, slaveId) {
    if(this.hasOrgAdminPrivilege(master, slaveId)){
        return true;
    };
    Organization.findById(slaveId)
        .then((organization) => {
            for ( member in organization.members ){
                console.log(`key=${member} value=${organization.members[member]}`);
            }
        }, (err) => next(err))
        .catch((err) => next(err));

    return false;
};

exports.hasOrgUserPrivilege = function (master, slaveId) {
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

exports.hasProjectUserPrivilege = function (master, slaveId) {
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