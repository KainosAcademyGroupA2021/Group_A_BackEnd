const express = require('express');
const router = express.Router()
const cors = require('cors');
const dbconnection = require('./dbconnection.js');

const bodyParser = require("body-parser");

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cors());

router.get("/", (req, res) => {
    res.json({hello: "world"});
});

router.get("/getJobRoles", async (req, res) => {
  res.json(await dbconnection.getJobRoles());
})


router.get("/getBandCompetencies", async (req, res) => {
    res.json(await dbconnection.getBandCompetencies());
})
module.exports = router;
