// Defines various levels of authorization based on organization, user role, and project

function hasOrgAdminPrivilege(master, organization) {
    console.log('hasOrgAdminPrivilege has been called');
    if (master.isAdmin === true) {
        return true;
    }else if (master.userRole !== 'org-admin') {
        console.log('hasOrgSuperUserPrivilege says not an org-admin');
        return false;
    }
    if (isOrgMember(master, organization) === true) {
        console.log('hasOrgAdminPrivilege has returned true');
        return true;
    } else {
        console.log('hasOrgAdminPrivilege has returned false');
        return false;
    }
}

exports.hasOrgAdminPrivilege = hasOrgAdminPrivilege;


function isOrgMember(master, organization) {
    const {members} = organization._doc;
    console.log(members);
    members.forEach((member) => {
        if (master._id == member.memberId) {
            isMember = true;
        }
    });
    console.log(isMember);
    if (isMember === true) {
        console.log('is a member of this organization');
        return true;
    } else {
        console.log('whoops - not a member of this organization');
        return false;
    }
}

function hasOrgSuperUserPrivilege(master, organization) {
    console.log('hasOrgSuperUserPrivilege has been called');

    if (master.isAdmin === true) {
        return true;
    } else if (master.userRole !== 'org-superuser') {
        console.log('hasOrgSuperUserPrivilege says not a superuser');
        return false;
    }
    if (isOrgMember(master, organization) === true) {
        console.log('hasOrgSuperUserPrivilege has returned true');
        return true;
    } else {
        console.log('hasOrgSuperUserPrivilege has returned false');
        return false;
    }
}

exports.hasOrgSuperUserPrivilege = hasOrgSuperUserPrivilege;


function hasOrgUserPrivilege(master, organization) {
    console.log('hasOrgUserPrivilege has been called');
    if (master.isAdmin === true) {
        return true;
    }
    console.log('not an admin');

    if (isOrgMember(master, organization) === true) {
        console.log('hasOrgUserPrivilege has returned true');
        return true;
    } else {
        console.log('hasOrgUserPrivilege has returned false');
        return false;
    }
}

exports.hasOrgUserPrivilege = hasOrgUserPrivilege;

exports.hasProjectUserPrivilege = function (master, slaveId) {
    if (master.isAdmin === true) {
        return true;
    }
};