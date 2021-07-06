const routes = require("../routes.js");
const request = require("supertest");
const express = require("express");
const app = express();
const assert = require('assert')

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

describe("Routes testing", function () {
  it("/people-list returns the list of people", done => {
    request(app)
      .get("/people-list")
      .expect("Content-Type", /json/)
      .expect([{ "PersonID": 1, "LastName": "Smith", "FirstName": "John", "Address": "12 Red Road", "City": "Belfast" }])
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


