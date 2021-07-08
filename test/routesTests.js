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

describe("Training by band", () => {
  it("/getTrainingByBand return list of trainings by band ", done=> {
    request(app)
    .get("/getTrainingByBand")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      console.log(response.body)
      
      assert(response.body[0], {
        BandID: 1,
        TrainingType: 'Professional skills',
        BandName: 'Trainee',
        TrainingName: 'Training name',
        TrainingLink: 'training link'
      })
      done();
    })
    .catch(err => done(err))
  
  })

})
describe("Band Competencies testing", () => {
  it("/getBandCompetencies return list of bands", done=> {
    request(app)
    .get("/getBandCompetencies")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      console.log(response.body)
      
      assert(response.body[0], {
        BandName: 'Trainee',
        BandLevel: 7,
        CompetenciesName: 'Communication & influence, Personal performance, Working with others, Setting direction development & accountability, Supporting & delivering strategy, Commerciality & risk'
      })
      done();
    })
    .catch(err => done(err))
  
  })


})

