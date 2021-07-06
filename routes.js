const express = require('express');
const router = express.Router()
const cors = require('cors');
const dbconnection = require('./dbconnection.js');

router.use(cors());

router.get("/people-list", async (req, res) => {
    res.json(await dbconnection.getPeopleList());
});

router.get("/", (req, res) => {
    res.json({hello: "world"});
});

router.get("/getJobRoles", async (req, res) => {
  res.json(await dbconnection.getJobRoles());
})

module.exports = router;
