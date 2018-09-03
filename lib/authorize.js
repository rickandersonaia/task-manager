// Defines various levels of authorization based on organization, user role, and project


function isOrgAdmin(master, organization) {
    if(master.userRole == 'org-admin'  && master.organizationId == organization._id){
        return true;
    }else{
        return false;
    }
}

function isOrgSuperUser(master, organization) {
    if(master.userRole == 'org-superuser'  && master.organizationId == organization._id){
        return true;
    }else{
        return false;
    }
}

function isOrgMember(master, organization) {
    var isMember = false;
    const {members} = organization._doc;
    members.forEach((member) => {
        if (master._id == member.memberId) {
            isMember = true;
        }
    });
    if (isMember === true) {
        return true;
    } else {
        return false;
    }
}

function hasOrgAdminPrivilege(master, organization) {
    console.log('hasOrgAdminPrivilege has been called');
    if (master.isAdmin === true) {
        return true;
    }else if (master.userRole !== 'org-admin') {
        console.log('hasOrgSuperUserPrivilege says not an org-admin');
        return false;
    }
    if (isOrgAdmin(master, organization) === true) {
        console.log('hasOrgAdminPrivilege has returned true');
        return true;
    } else {
        console.log('hasOrgAdminPrivilege has returned false');
        return false;
    }
}

exports.hasOrgAdminPrivilege = hasOrgAdminPrivilege;


function hasOrgSuperUserPrivilege(master, organization) {
    console.log('hasOrgSuperUserPrivilege has been called');

    if (master.isAdmin === true) {
        return true;
    } else if (master.userRole !== 'org-superuser' && master.userRole !== 'org-admin') {
        console.log('hasOrgSuperUserPrivilege says not a superuser');
        return false;
    }

    if (isOrgAdmin(master, organization) === true) {
        console.log('hasOrgSuperUserPrivilege has returned true');
        return true;
    }else if (isOrgSuperUser(master, organization) === true) {
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
    }else if (isOrgAdmin(master, organization) === true) {
        console.log('hasOrgUserPrivilege has returned true');
        return true;
    }else if (isOrgSuperUser(master, organization) === true) {
        console.log('hasOrgUserPrivilege has returned true');
        return true;
    }else if (isOrgMember(master, organization) === true) {
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