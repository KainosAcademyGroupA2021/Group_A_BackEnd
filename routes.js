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
    const result = await dbconnection.getTraingByBand();
    console.log(result);
    res.json(result);
})


router.get("/getBandCompetencies", async (req, res) => {
    res.json(await dbconnection.getBandCompetencies());
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

module.exports = router;
