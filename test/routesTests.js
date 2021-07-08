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

describe("Band responsibilites testing", () => {
  it("/getBandResponsibilities return list of band responsibities", done=> {
    request(app)
    .get("/getBandResponsibilities")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      console.log(response.body)
      
      assert(response.body[0], {
        BandID: 2,
        BandName: 'Apprentice',
        BandLevel: '1',
        Responsibilities: 'As a Apprentince in Kainos, you’ll be responsible for contributing to the development of high-quality solutions to delight our customers and impact the lives of users worldwide. ',
      })
      done();
    })
    .catch(err => done(err))
  
  })


})