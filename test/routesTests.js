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


describe("Routes testing", function () {
  it("/getJobRoles returns a single role object", done => {
    request(app)
      .get("/getJobRoles")
      .expect("Content-Type", /json/)
      .expect([{"RoleID":2,"RoleName":"Software Engineer","RoleSpec":"link to spec","CapabilityID":1,"BandID":1}])
      .expect(200, done);
  })
});

describe("jobRoleSpecification testing", () => {
  it("/job-roles return specification within role", done=> {
    request(app)
    .get("/job-roles")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      console.log(response.body)
      
      assert(response.body, {
        RoleName: 'Software Engineer',
        RoleSpec: 'link to spec'
      })
      done();
    })
    .catch(err => done(err))
  
  })


})
