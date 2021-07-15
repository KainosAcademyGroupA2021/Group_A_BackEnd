const express = require('express');
const router = express.Router()
const cors = require('cors');
const dbconnection = require('./dbconnection.js');

const bodyParser = require("body-parser");

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swaggerFile.json')

router.use(express.urlencoded({ extended: true }));
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, {explorer: true}))
router.use(bodyParser.json());

router.use(cors());

router.get("/", (req, res) => {
    res.json({ hello: "world" });
});

router.get("/getJobRoles", async (req, res) => {
   // #swagger.description = 'gets all job roles currently available and returns RoleID, RoleName, RoleSpec, RoleSpecSummary, CapabilityName, BandName, BandLevel'
    res.json(await dbconnection.getJobRoles());
})

router.get("/getJobFamilies", async (req, res) => {
  // #swagger.description = 'gets all job families and returns JobFamilyID, JobFamilyName and CapabilityID'
    res.json(await dbconnection.getJobFamilies());
})

router.get("/getCapabilities", async (req, res) => {
  // #swagger.description = 'gets all capabilities and returns CapabilityID, CapabilityName, CapabilityLeadID'
    res.json(await dbconnection.getCapabilities());
})

router.get("/getBands", async (req, res) => {
  // #swagger.description = 'gets all bands and returns BandID, BandName, BandLevel, Responsibilities ,CompetenciesID'
    res.json(await dbconnection.getBands());
})


router.get("/getBandResponsibilities", async (req, res) => {
  // #swagger.description = 'gets all bands responsibilites and returns BandID, BandName, BandLevel, Responsibilities'
    res.json(await dbconnection.getBandResponsibilities());
})


router.get("/getCapabilityAndJobFamily", async (req, res) => {
  // #swagger.description = 'gets all capabilities and job familes that relate to them and returns CapabilityName, JobFamilyName'
    res.json(await dbconnection.getCapabilityAndJobFamily());
})


router.get("/getTrainingByBand", async (req, res) => {
  // #swagger.description = 'gets all Training by band and returns BandID, BandLevel, TrainingType, BandName, TrainingName, TrainingLink'
    res.json(await dbconnection.getTraingByBand())
})


router.get("/getBandCompetencies", async (req, res) => {
    // #swagger.description = 'gets all band Competencies and returns BandName, BandLevel, CompetenciesName'
    res.json(await dbconnection.getBandCompetencies());
})


router.get("/getTrainings", async (req, res) => {
  // #swagger.description = 'gets all training and returns TrainingID, TrainingName, TrainingType, TrainingLink'
    res.json(await dbconnection.getTrainings())
})


router.get("/getCompetencies", async (req, res) => {
  // #swagger.description = 'gets all competencies and returns CompetenciesID, CompetenciesName'
    res.json(await dbconnection.getCompetencies());
})

router.get("/getCapabilityLeads", async (req, res) => {
  // #swagger.description = 'gets all capability leads  and returns CapabilityLeadID, CapabilityLeadName, CapabilityLeadPhoto, CapabilityLeadMessage, CapabilityID, CapabilityName'
    res.json(await dbconnection.getCapabilityLeads());
})


router.get("/getRoleWithCapabilityID/:id", async (req, res) => {
  // #swagger.description = 'gets all roles with a capability id and returns CapabilityID, JobFamilyID, RoleID, RoleName, RoleSpec, BandID, RoleSpecSummary, JobFamilyName, CapabilityName, CapabilityLeadID'
    res.json(await dbconnection.getRoleWithCapabilityID(req.params.id));
})

router.post("/addRole", async (req, res) => {
  // #swagger.description = 'posts a new role with RoleName, RoleSpec, JobFamilyID, BandID, RoleSpecSummary'
    let result;
    if (req.body.RoleName === "" || req.body.RoleSpec === "" || req.body.JobFamilyID === "" || req.body.BandID === "" || req.body.RoleSpecSummary === "") {
        result = {error: "Empty inputs"}
    } else {
        result = await dbconnection.addRole(req.body);
    }
    res.json(result);
})

router.put("/editRole/:id", async (req, res) => {
  // #swagger.description = 'puts an existing role with RoleName, RoleSpec, JobFamilyID, BandID, RoleSpecSummary'
    let result;
    if (req.body.RoleName === "" || req.body.RoleSpec === "" || req.body.JobFamilyID === "" || req.body.BandID === "" || req.body.RoleSpecSummary === "") {
        result = {error: "Empty inputs"}
    } else {
        result = await dbconnection.editRole(req.body, req.params.id);
    }
    res.json(result);
})

router.post("/deleteRole", async (req, res) => {
  // #swagger.description = 'deletes an existing role by RoleID'
    let result = await dbconnection.deleteRole(req.body.RoleID);
    res.json(result);
})

router.post("/addNewJobFamily", async (req, res) => {
  // #swagger.description = 'adds a new job family with JobFamilyName, CapabilityID'
  let result;
  if (req.body.JobFamilyName === "" || req.body.CapabilityID === "") {
      result = "Bad request"
  } else {
      result = await dbconnection.addJobFamily(req.body);
  }
  res.json(result);
})

router.post("/deleteJobFamily", async (req, res) => {
  // #swagger.description = 'deletes an existing JobFamily by JobFamilyID'
   let result;
   result = await dbconnection.deleteJobFamily(req.body.JobFamilyID);
   res.json(result);
})

router.post("/deleteBand", async (req, res) => {
  // #swagger.description = 'deletes an existing band by BandID'
    let result = await dbconnection.deleteBand(req.body.BandID);1
    res.json(result);

})


router.post("/addBand", async (req, res) => {
  // #swagger.description = 'adds a new band with BandName, BandLevel, CompetencyID, Responsibilities, TrainingsList'
    let result;
    let insertId;
    if (req.body.BandName === "" || req.body.BandLevel === "" || req.body.CompetencyID === "" || req.body.Responsibilities === "") {
        result = "Bad request"
        console.log("bad request")
    } else {
        console.log("Adding Band")
        insertId = await dbconnection.addBand(
            {
                BandName: req.body.BandName,
                BandLevel: req.body.BandLevel,
                CompetenciesID: req.body.CompetencyID,
                Responsibilities: req.body.Responsibilities
            });
        if (req.body.TrainingsList) {
        for (let TrainingID of req.body.TrainingsList) {
            result = await dbconnection.addBandTraining(TrainingID, insertId);
        }
    }
    }
    res.json(insertId);
})

router.post("/addCapability", async (req, res) => {
  // #swagger.description = 'adds a new capability with CapabilityName, CapabilityLeadID'
    let result;
    if (req.body.CapabilityName === "" || req.body.CapabilityLeadID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.addCapability(req.body);
    }
    res.json(result);
})

router.post("/deleteCapability", async (req, res) => {
  // #swagger.description = 'deletes an existing capability by CapabilityID'
    let result = await dbconnection.deleteCapability(req.body.CapabilityID);
    res.json(result);
})

module.exports = router;
