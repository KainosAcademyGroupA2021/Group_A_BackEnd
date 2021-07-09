const routes = require("../routes.js");
const request = require("supertest");
const express = require("express");
const assert = require("assert");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

describe("Job roles testing", () => {
  it("/getJobRoles return list of roles", done => {
    request(app)
      .get("/getJobRoles")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {

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

describe("Job Families Route Testing", () => {
  it("/getJobFamilies return list of job families", done => {
    request(app)
      .get("/getJobFamilies")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert.deepStrictEqual(response.body[0], {
          CapabilityID: 1,
          JobFamilyID: 1,
          JobFamilyName: "Engineering Strategy and Planning",
        })
        done();
      })
      .catch(err => done(err))
  })
})

describe("Bands Route Testing", () => {
  it("/getBands return list of bands", done => {
    request(app)
      .get("/getBands")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert.deepStrictEqual(response.body[0], {
          BandID: 2,
          BandName: 'Apprentice',
          BandLevel: 1,
          Responsibilities: 'As a Apprentince in Kainos, you’ll be responsible for contributing to the development of high-quality solutions to delight our customers and impact the lives of users worldwide. ',
          TrainingID: 1,
          CompetenciesID: null
        })
        done();
      })
      .catch(err => done(err))
  })
})

describe("Capability Route Testing", () => {
  it("/getCapabilities return list of job families", done => {
    request(app)
      .get("/getCapabilities")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {

        assert.deepStrictEqual(response.body[0], {
          CapabilityID: 1,
          CapabilityName: 'Engineering',
          CapabilityLeadID: 1
        })
        done();
      })
      .catch(err => done(err))
  })
})

describe("Add role post Route Testing", () => {
  it("/addRole will successfully add a role", done => {
    request(app)
      .post("/addRole")
      .send({
        RoleName: 'TestRole',
        RoleSpec: 'TestLink',
        JobFamilyID: '1',
        BandID: '9'
      })
      .set('Accept', 'application/json')
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        return response.body;
      })
      .then((id) => {
        request(app)
          .post("/deleteRole")
          .send({
            RoleID: id
          })
          .set('Accept', 'application/json')
          .expect("Content-Type", /json/)
          .expect(200)
          .then(response => {
            done();
        })
        .catch(err => done(err))
      })
      .catch(err => done(err))
    // .then(response => {
    //   console.log(response.body)

    //   assert.deepStrictEqual(response.body[0], {
    //     CapabilityID: 1,
    //     JobFamilyID: 1,
    //     JobFamilyName: "Engineering Strategy and Planning",
    //   })
    //   done();
    // })
    // .catch(err => done(err))
  })
})
