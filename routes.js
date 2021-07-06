const express = require('express');
const router = express.Router()
const dbconnection = require('./dbconnection.js');

router.get("/people-list", async (req, res) => {
    res.json(await dbconnection.getPeopleList());
});

router.get("/", (req, res) => {
    res.json({hello: "world"});
});

router.get("/role/:id/capability-name", async (req, res) => {
    let role_id = req.params.id;
    let response = await dbconnection.getCapabilityOfRoleId(role_id);
    res.json(response);
});

module.exports = router;