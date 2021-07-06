const routes = require("../routes.js");
const request = require("supertest");
const express = require("express");
const assert = require("assert")
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

describe("Routes testing", function () {
  it("/people-list returns the list of people", done => {
    request(app)
      .get("/people-list")
      .expect("Content-Type", /json/)
      .then(response => {
        assert(response.body[0], { "PersonID": 1, "LastName": "Smith", "FirstName": "John", "Address": "12 Red Road", "City": "Belfast" })
        done();
      })
      .catch(err => done(err))
  })


  it("/rolesWithCapabilityNames returns the list of roles and their capabilities.", done => {
    request(app)
      .get("/rolesWithCapabilityNames")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert(response.body[0], {
          RoleId: 2,
          RoleName: 'Software Engineer',
          CapabilityName: 'Engineering'
        })
        done();
      })
      .catch(err => done(err))
  })
});
