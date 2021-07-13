const express = require('express');
const router = express.Router()
const cors = require('cors');
const dbconnection = require('./dbconnection.js');

const bodyParser = require("body-parser");

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cors());

router.get("/", (req, res) => {
    res.json({ hello: "world" });
});

router.get("/getJobRoles", async (req, res) => {
    res.json(await dbconnection.getJobRoles());
})

router.get("/getJobFamilies", async (req, res) => {
    res.json(await dbconnection.getJobFamilies());
})

router.get("/getCapabilities", async (req, res) => {
    res.json(await dbconnection.getCapabilities());
})

router.get("/getBands", async (req, res) => {
    res.json(await dbconnection.getBands());
})


router.get("/getBandResponsibilities", async (req, res) => {
    res.json(await dbconnection.getBandResponsibilities());
})


router.get("/getCapabilityAndJobFamily", async (req, res) => {
    res.json(await dbconnection.getCapabilityAndJobFamily());
})


router.get("/getTrainingByBand", async (req, res) => {
    res.json(await dbconnection.getTraingByBand())
})


router.get("/getBandCompetencies", async (req, res) => {
    res.json(await dbconnection.getBandCompetencies());
})


router.get("/getTrainings", async (req, res) => {
    res.json(await dbconnection.getTrainings())
})


router.get("/getCompetencies", async (req, res) => {
    res.json(await dbconnection.getCompetencies());
})

router.get("/getCapabilityLeads", async (req, res) => {
    res.json(await dbconnection.getCapabilityLeads());
})


router.post("/addRole", async (req, res) => {
    let result;
    if (req.body.RoleName === "" || req.body.RoleSpec === "" || req.body.JobFamilyID === "" || req.body.BandID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.addRole(req.body);
    }
    res.json(result);
})

router.post("/deleteRole", async (req, res) => {
    let result = await dbconnection.deleteRole(req.body.RoleID);
    res.json(result);
})

router.post("/deleteBand", async (req, res) => {
    let result = await dbconnection.deleteBand(req.body.BandID);
    res.json(result);
})


router.post("/addBand", async (req, res) => {
    let result;
    let insertId;
    console.log(req.body)
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
    let result;
    if (req.body.CapabilityName === "" || req.body.CapabilityLeadID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.addCapability(req.body);
    }
    res.json(result);
})

router.get("/getCapabilityByID", async (req, res) => {
    res.json(await dbconnection.getCapabilityByID(req.body.CapabilityID));
})
router.put("/editCapability", async (req, res) => {
    let result;
    if (req.body.CapabilityName === "" || req.body.CapabilityLeadID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.editCapability(req.body);
    }
    res.json(result);
})

router.post("/deleteCapability", async (req, res) => {
    let result = await dbconnection.deleteCapability(req.body.CapabilityID);
    res.json(result);
})

module.exports = router;
