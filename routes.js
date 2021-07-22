const express = require('express');
const router = express.Router()
const cors = require('cors');
const dbconnection = require('./dbconnection.js');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swaggerFile.json')

router.use(express.urlencoded({ extended: true }));
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }))
router.use(express.json());

router.use(cors());

const { JWT, JWTscopes } = require('./jwt')
const jwksRsa = require('jwks-rsa');

const checkJwt = JWT({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-lager9zv.us.auth0.com/.well-known/jwks.json`
    }),
    audience: `http://my.api:50001`,
    issuer: [`https://dev-lager9zv.us.auth0.com/`],
    algorithms: ['RS256']
});

const checkScopes = JWTscopes(['read:secured']);
const adminCheckScopes = JWTscopes(['read:secured', 'write:secured'], { checkAllScopes: true })


router.get("/", (req, res) => {
    res.json({ hello: "world" });
});

router.get("/getJobRoles", checkJwt, checkScopes, async (req, res) => {
    // #swagger.description = 'gets all job roles currently available and returns RoleID, RoleName, RoleSpec, RoleSpecSummary, CapabilityName, BandName, BandLevel, JobFamilyID'
    res.json(await dbconnection.getJobRoles());
})

router.get("/getJobRolesAdmin", checkJwt, adminCheckScopes, async (req, res) => {
    // #swagger.description = 'gets all job roles currently available and returns RoleID, RoleName, RoleSpec, RoleSpecSummary, CapabilityName, BandName, BandLevel'
    res.json(await dbconnection.getJobRoles());
})

router.get("/getJobFamilies", checkJwt, checkScopes, async (req, res) => {
    // #swagger.description = 'gets all job families and returns JobFamilyID, JobFamilyName and CapabilityID'
    res.json(await dbconnection.getJobFamilies());
})

router.get("/getCapabilities", checkJwt, checkScopes, async (req, res) => {
  // #swagger.description = 'gets all capabilities and returns CapabilityID, CapabilityName, CapabilityLeadID'
    res.json(await dbconnection.getCapabilities());
})

router.get("/getBandsAdmin", checkJwt, adminCheckScopes, async (req, res) => {
  // #swagger.description = 'gets all bands and returns BandID, BandName, BandLevel, Responsibilities ,CompetenciesID'
    res.json(await dbconnection.getBands());
})

router.get("/getBands", checkJwt, checkScopes, async (req, res) => {
    // #swagger.description = 'gets all bands and returns BandID, BandName, BandLevel, Responsibilities ,CompetenciesID'
      res.json(await dbconnection.getBands());
  })

router.get("/getBandResponsibilities", checkJwt, checkScopes, async (req, res) => {
  // #swagger.description = 'gets all bands responsibilites and returns BandID, BandName, BandLevel, Responsibilitiess
    res.json(await dbconnection.getBandResponsibilities());
})

router.get("/getCapabilityAndJobFamily", checkJwt, checkScopes, async (req, res) => {
    // #swagger.description = 'gets all capabilities and job familes that relate to them and returns CapabilityName, JobFamilyName'
    res.json(await dbconnection.getCapabilityAndJobFamily());
})

router.get("/getTrainingByBand", checkJwt, checkScopes, async (req, res) => {
    // #swagger.description = 'gets all Training by band and returns BandID, BandLevel, TrainingType, BandName, TrainingName, TrainingLink'
    res.json(await dbconnection.getTraingByBand())
})

router.get("/getBandCompetencies", checkJwt, checkScopes, async (req, res) => {
    // #swagger.description = 'gets all band Competencies and returns BandName, BandLevel, CompetenciesName'
    res.json(await dbconnection.getBandCompetencies());
})


router.get("/getTrainings", checkJwt, checkScopes, async (req, res) => {
  // #swagger.description = 'gets all training and returns TrainingID, TrainingName, TrainingType, TrainingLink'
    res.json(await dbconnection.getTrainings())
})

router.get("/getCompetencies", checkJwt, checkScopes, async (req, res) => {
  // #swagger.description = 'gets all competencies and returns CompetenciesID, CompetenciesName'
    res.json(await dbconnection.getCompetencies());
})

router.get("/getCapabilityLeads", checkJwt, checkScopes, async (req, res) => {
    // #swagger.description = 'gets all capability leads  and returns CapabilityLeadID, CapabilityLeadName, CapabilityLeadPhoto, CapabilityLeadMessage, CapabilityID, CapabilityName'
    res.json(await dbconnection.getCapabilityLeads());
})

router.get("/getBand/:id", checkJwt, checkScopes, async (req, res) => {
    res.json(await dbconnection.getBand(req.params.id));
})

router.get("/getTakenBandLevels", checkJwt, adminCheckScopes, async (req, res) => {
    res.json(await dbconnection.getTakenBandLevels());
})

router.get("/getAssociatedTrainingIDsWithBand/:id", checkJwt, checkScopes, async (req, res) => {
    res.json(await dbconnection.getAssociatedTrainingIDsWithBand(req.params.id));
})

router.get("/getAssociatedCompetenciesIDsWithBand/:id", checkJwt, checkScopes, async (req, res) => {
    res.json(await dbconnection.getAssociatedCompetenciesIDsWithBand(req.params.id));
})


router.get("/getRoleWithCapabilityID/:id", checkJwt, checkScopes, async (req, res) => {
  // #swagger.description = 'gets all roles with a capability id and returns CapabilityID, JobFamilyID, RoleID, RoleName, RoleSpec, BandID, RoleSpecSummary, JobFamilyName, CapabilityName, CapabilityLeadID'
    res.json(await dbconnection.getRoleWithCapabilityID(req.params.id));
})

router.post("/addRole", checkJwt, adminCheckScopes, async (req, res) => {
    // #swagger.description = 'posts a new role with RoleName, RoleSpec, JobFamilyID, BandID, RoleSpecSummary'
    let result;
    if (req.body.RoleName === "" || req.body.RoleSpec === "" || req.body.JobFamilyID === "" || req.body.BandID === "" || req.body.RoleSpecSummary === "") {
        result = { error: "Empty inputs" }
    } else {
        result = await dbconnection.addRole(req.body);
    }
    res.json(result);
})

router.put("/editRole/:id", checkJwt, adminCheckScopes, async (req, res) => {
    // #swagger.description = 'puts an existing role with RoleName, RoleSpec, JobFamilyID, BandID, RoleSpecSummary'
    let result;
    if (req.body.RoleName === "" || req.body.RoleSpec === "" || req.body.JobFamilyID === "" || req.body.BandID === "" || req.body.RoleSpecSummary === "") {
        result = { error: "Empty inputs" }
    } else {
        result = await dbconnection.editRole(req.body, req.params.id);
    }
    res.json(result);
})

router.post("/deleteRole", checkJwt, adminCheckScopes, async (req, res) => {
    // #swagger.description = 'deletes an existing role by RoleID'
    let result = await dbconnection.deleteRole(req.body.RoleID);
    res.json(result);
})

router.post("/addNewJobFamily",checkJwt, checkScopes, async (req, res) => {
    // #swagger.description = 'adds a new job family with JobFamilyName, CapabilityID'
    let result;
    if (req.body.JobFamilyName === "" || req.body.CapabilityID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.addJobFamily(req.body);
    }
    res.json(result);
})

router.post("/deleteJobFamily", checkJwt, checkScopes, async (req, res) => {
    if (!await dbconnection.canDeleteJobFamily(req.body.JobFamilyID)) {
        res.json("error");
    } else {
        let result = await dbconnection.deleteJobFamily(req.body.JobFamilyID);
        // #swagger.description = 'deletes an existing JobFamily by JobFamilyID'
        res.json(result);
    }
})


router.put("/editJobFamily/:id", checkJwt, adminCheckScopes, async (req, res) => {
    // #swagger.description = 'edits an existing JobFamily by JobFamilyID'
    let result;
    if (req.body.JobFamilyName === "" || req.body.CapabilityID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.editJobFamily(req.body, req.params.id);
    }
    res.json(result);
})


  router.get("/getJobFamilyByID/:id", checkJwt, adminCheckScopes, async (req, res) => {
    // #swagger.description = 'gets an existing JobFamily by JobFamilyID'
    res.json(await dbconnection.getJobFamilyByID(req.params.id));
})


router.post("/deleteBand", checkJwt, adminCheckScopes, async (req, res) => {
    //delete links in junction table associated with band
    if (!await dbconnection.canDeleteBand(req.body.BandID)) {
        res.json("error");
    } else {
        let result = await dbconnection.deleteAssociatedTrainingsWithBand(req.body.BandID);
        result = await dbconnection.deleteAssociatedCompetenciesWithBand(req.body.BandID);
        result = await dbconnection.deleteBand(req.body.BandID);
        // #swagger.description = 'deletes an existing band by BandID'
        res.json(result);
    }
})

router.post("/addBand", checkJwt, adminCheckScopes, async (req, res) => {
  // #swagger.description = 'adds a new band with BandName, BandLevel, CompetencyID, Responsibilities, TrainingsList'

    let result;
    let insertId;
    if (req.body.BandName === "" || req.body.BandLevel === "" || req.body.Responsibilities === "") {
        result = "Bad request"
        console.log("bad request")
    } else {
        insertId = await dbconnection.addBand(
            {
                BandName: req.body.BandName,
                BandLevel: req.body.BandLevel,
                Responsibilities: req.body.Responsibilities
            });
        if (req.body.TrainingsList) {
            for (let TrainingID of req.body.TrainingsList) {
                result = await dbconnection.addBandTraining(TrainingID, insertId);
            }
        }
        if (req.body.CompetenciesList) {
            for (let CompetenciesID of req.body.CompetenciesList) {
                result = await dbconnection.addBandCompetency(CompetenciesID, insertId);
            }
        }
    }
    res.json(insertId);
})

router.put("/editBand/:id", checkJwt, adminCheckScopes, async (req, res) => {
    let result = "Bad Request";
    let id = req.params.id;
    if (req.body.BandName === "" || req.body.BandLevel === "" || req.body.Responsibilities === "") {
        result = "Bad request";
        console.log("bad request");
    } else {
        result = await dbconnection.editBand(
            {
                BandName: req.body.BandName,
                BandLevel: req.body.BandLevel,
                Responsibilities: req.body.Responsibilities
            }, id);
            console.log(result)
        if (req.body.TrainingsList) {
            result = await dbconnection.deleteAssociatedTrainingsWithBand(id);
            for (let TrainingID of req.body.TrainingsList) {
                result = await dbconnection.addBandTraining(TrainingID, id);
            }
        }
        if (req.body.CompetenciesList) {
            result = await dbconnection.deleteAssociatedCompetenciesWithBand(id);
            for (let CompetenciesID of req.body.CompetenciesList) {
                result = await dbconnection.addBandCompetency(CompetenciesID, id);
            }
        }
    }
    res.json(id);
})

router.post("/addCapability", checkJwt, adminCheckScopes, async (req, res) => {
  // #swagger.description = 'adds a new capability with CapabilityName, CapabilityLeadID'
    let result;
    if (req.body.CapabilityName === "" || req.body.CapabilityLeadID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.addCapability(req.body);
    }
    res.json(result);
})

router.get("/getCapabilityByID/:id", checkJwt, checkScopes, async (req, res) => {
      // #swagger.description = 'gets an existing Capability by CapabilityID'
    res.json(await dbconnection.getCapabilityByID(req.params.id));
})
  
router.put("/editCapability/:id", checkJwt, adminCheckScopes, async (req, res) => {
    // #swagger.description = 'edits an existing Capability by CapabilityID'
    let result;
    if (req.body.CapabilityName === "" || req.body.CapabilityLeadID === "") {
        result = "Bad request"
    } else {
        result = await dbconnection.editCapability(req.body, req.params.id);
    }
    res.json(result);
})

router.post("/deleteCapability", checkJwt, adminCheckScopes, async (req, res) => {
    if (!await dbconnection.canDeleteCapability(req.body.CapabilityID)) {
        res.json("error");
    } else {
        let result = await dbconnection.deleteCapability(req.body.CapabilityID);
        // #swagger.description = 'deletes an existing Capability by CapabilityID'
        res.json(result);
    }
})


module.exports = router;
