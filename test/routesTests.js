const routes = require("../routes.js");
const request = require("supertest");
const express = require("express");
const assert = require("assert")
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

describe("Job roles testing", () => {
  it("/getJobRoles return list of roles", done=> {
    request(app)
    .get("/getJobRoles")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      console.log(response.body)

      assert(response.body[0], {
        RoleID: 2,
        RoleName: 'Software Engineer',
        RoleSpec: 'link to spec',
        CapabilityName: 'Engineering',
        BandName: 'Trainee'
      })
      done();
    })
    .catch(err => done(err))

  })


})

describe("Capability and Job Family endpoint test", () => {
  it("/getCapabilityAndJobFamily return list of relations", done=> {
    request(app)
    .get("/getCapabilityAndJobFamily")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      console.log(response.body)

      assert(response.body[0], {
        CapabilityID: 1,
        CapabilityName: 'Engineering',
        JobFamilyName: 'Engineering Strategy and Planning'
      })
      done();
    })
    .catch(err => done(err))

  })


})
