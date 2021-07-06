const routes = require("../routes.js");
const request = require("supertest");
const express = require("express");
const app = express();

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

describe("Routes testing", function () {
  it("/getJobRoles returns a single role object", done => {
    request(app)
      .get("/getJobRoles")
      .expect("Content-Type", /json/)
      .expect([{"RoleID":2,"RoleName":"Software Engineer","RoleSpec":"link to spec","CapabilityID":1,"BandID":1}])
      .expect(200, done);
  })
});
