const express = require('express');
const router = express.Router()
const dbconnection = require('./dbconnection.js');

router.get("/people-list", async (req, res) => {
    res.json(await dbconnection.getPeopleList());
});

router.get("/", (req, res) => {
    res.json({hello: "world"});
});

module.exports = router;