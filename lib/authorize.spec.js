const chai = require('chai');
const expect = chai.expect;

var authorize = require('./authorize');

describe('authorize', () => {
    const appAdminUser = {
        isAdmin: true
    };

    const orgAdminUser = {
        _id: 'userid-abc',
        isAdmin: false,
        userRole: 'org-admin',
        organizationId: 'orgid-abc'
    };

    const orgSuperUser = {
        _id: 'userid-def',
        isAdmin: false,
        userRole: 'org-superuser',
        organizationId: 'orgid-abc'
    };

    const orgUser = {
        _id: 'userid-ghi',
        isAdmin: false,
        userRole: 'org-user',
        organizationId: 'orgid-abc'
    };

    const testOrganization = {
        _id: 'orgid-abc',
        owner: 'userid-abc',
        members: [
            {memberId: 'userid-def'},
            {memberId: 'userid-ghi'}
        ],
        _doc: {
            _id: '5b8b15941a088b6368971412',
            name: 'Bill\'s Pub',
            description: 'Friendly Neighborhood Pub',
            members: [
                {
                    _id: '5b8b15951a088b6368971414',
                    memberId: 'userid-def'
                },
                {
                    _id: '5b8c17a706527747149b257b',
                    memberId: 'userid-ghi'
                }
            ],
            createdAt: '2018-09-01T22:41:24.958Z',
            updatedAt: '2018-09-02T17:02:31.085Z',
            __v: 0
        }
    };

    const testOrganization2 = {
        _id: 'orgid-def',
        owner: 'userid-zzz',
        members: [
            {memberId: 'userid-xxx'},
            {memberId: 'userid-yyy'}
        ],
        _doc: {
            _id: '5b8b15941a088b6368971412',
            name: 'Bill\'s Pub',
            description: 'Friendly Neighborhood Pub',
            members: [
                {
                    _id: '5b8b15951a088b6368971414',
                    memberId: 'userid-xxx'
                },
                {
                    _id: '5b8c17a706527747149b257b',
                    memberId: 'userid-yyy'
                }
            ],
            createdAt: '2018-09-01T22:41:24.958Z',
            updatedAt: '2018-09-02T17:02:31.085Z',
            __v: 0
        }
    };

    context('hasOrgAdminPrivilege', () => {
        it('should return true when user isAdmin is true', () => {
            expect(authorize.hasOrgAdminPrivilege(appAdminUser, testOrganization)).to.equal(true);
        });
        it('should return false when isAdmin is false', () => {
            expect(authorize.hasOrgAdminPrivilege(orgUser, testOrganization)).to.equal(false);
        });
        it('should return true when isAdmin is false but userRole is org-admin in the given organization', () => {
            expect(authorize.hasOrgAdminPrivilege(orgAdminUser, testOrganization)).to.equal(true);
        });
        it('should return false when isAdmin is false and userRole is org-admin in the wrong organization', () => {
            expect(authorize.hasOrgAdminPrivilege(orgAdminUser, testOrganization2)).to.equal(false);
        });
        it('should return false when isAdmin is false and userRole is not org-admin in', () => {
            expect(authorize.hasOrgAdminPrivilege(orgUser, testOrganization2)).to.equal(false);
        })
    });

    context('hasOrgSuperUserPrivilege', () => {
        it('should return true when user isAdmin is true', () => {
            expect(authorize.hasOrgSuperUserPrivilege(appAdminUser, testOrganization)).to.equal(true);
        });
        it('should return false when isAdmin is false and userRole isnt org-superuser or org-admin', () => {
            expect(authorize.hasOrgSuperUserPrivilege(orgUser, testOrganization)).to.equal(false);
        });
        it('should return true when isAdmin is false but userRole is org-admin in the given organization', () => {
            expect(authorize.hasOrgSuperUserPrivilege(orgAdminUser, testOrganization)).to.equal(true);
        });
        it('should return true when isAdmin is false but userRole is org-superuser in the given organization', () => {
            expect(authorize.hasOrgSuperUserPrivilege(orgSuperUser, testOrganization)).to.equal(true);
        });
        it('should return false when isAdmin is false and userRole is org-admin in the wrong organization', () => {
            expect(authorize.hasOrgSuperUserPrivilege(orgAdminUser, testOrganization2)).to.equal(false);
        });
        it('should return false when isAdmin is false and userRole is org-superuser in the wrong organization', () => {
            expect(authorize.hasOrgSuperUserPrivilege(orgSuperUser, testOrganization2)).to.equal(false);
        });
    });

    context('hasOrgUserPrivilege', () => {
        it('should return true when user isAdmin is true', () => {
            expect(authorize.hasOrgUserPrivilege(appAdminUser, testOrganization)).to.equal(true);
        });
        it('should return true when isAdmin is false and user is org-admin in the organization', () => {
            expect(authorize.hasOrgUserPrivilege(orgAdminUser, testOrganization)).to.equal(true);
        });
        it('should return false when isAdmin is false and user is org-admin in the wrong organization', () => {
            expect(authorize.hasOrgUserPrivilege(orgAdminUser, testOrganization2)).to.equal(false);
        });
        it('should return true when isAdmin is false and user is org-superuser in the organization', () => {
            expect(authorize.hasOrgUserPrivilege(orgSuperUser, testOrganization)).to.equal(true);
        });
        it('should return false when isAdmin is false and user is org-superuser in the wrong organization', () => {
            expect(authorize.hasOrgUserPrivilege(orgSuperUser, testOrganization2)).to.equal(false);
        });
        it('should return true when isAdmin is false and user is org-user in the organization', () => {
            expect(authorize.hasOrgUserPrivilege(orgUser, testOrganization)).to.equal(true);
        });
        it('should return false when isAdmin is false and user is not in the organization', () => {
            expect(authorize.hasOrgUserPrivilege(orgUser, testOrganization2)).to.equal(false);
        });
    })


});