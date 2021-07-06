var assert = require('assert');
const dbconnection = require('../dbconnection.js');


describe('Database Connection', function() {
    it('People list query should return a list of people', async function() {
        var peopleList = await dbconnection.getPeopleList();
        assert.notStrictEqual(peopleList[0], {"PersonID":1,"LastName":"Smith","FirstName":"John","Address":"12 Red Road","City":"Belfast"}, "Failed to retrieve first person in people table.");
    });

    it('Roles with capabilities list query should return a list of roles with capabilities', async function() {
      var roleCapabilityList = await dbconnection.getCapabilitiesOfRoles();
      assert.notStrictEqual(roleCapabilityList[0], {
        RoleId: 2,
        RoleName: 'Software Engineer',
        CapabilityName: 'Engineering'
      }, "Failed to retrieve first role with capability in people table.");
  });

});