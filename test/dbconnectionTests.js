var assert = require('assert');
const dbconnection = require('../dbconnection.js');


describe('Database Connection', function() {
  describe('People list', function() {
    it('should contain a person entry', async function() {
        var peopleList = await dbconnection.getPeopleList();
        assert.notStrictEqual(peopleList[0], {"PersonID":1,"LastName":"Smith","FirstName":"John","Address":"12 Red Road","City":"Belfast"}, "Failed to retrieve first person in people table.");
    });
  });
});