const mysql = require('mysql')

const express = require("express");
const cors = require('cors');
const app = express()
const dbconfig = require('./dbconfig.js')

const util = require('util')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

function wrapDB(dbconfig) {
    const pool = mysql.createPool(dbconfig)
    return {
        query(sql, args) {
            return util.promisify(pool.query)
                .call(pool, sql, args)
        },
        release() {
            return util.promisify(pool.releaseConnection)
                .call(pool)
        }
    }
}

const db = wrapDB(dbconfig);

exports.getJobRoles = async () => {
    let response = await db.query('SELECT RoleID, RoleName, RoleSpec, RoleSpecSummary, CapabilityName, BandName, BandLevel, JobFamilyID FROM JobRoleDatabase.Role JOIN JobFamily USING (JobFamilyID) JOIN Capability USING (CapabilityID) JOIN Band USING (BandID) ORDER BY BandLevel;')
    return response;
}

exports.getJobFamilies = async () => {
    let response = await db.query('SELECT CapabilityID, JobFamilyID, JobFamilyName, CapabilityName FROM JobFamily JOIN Capability USING (CapabilityID);')
    return response;
}


exports.getBandResponsibilities = async () => {
    let response = await db.query('SELECT BandID, BandName, BandLevel, Responsibilities FROM JobRoleDatabase.Band ORDER BY BandLevel');
    return response;
}



exports.getCapabilityAndJobFamily = async () => {
    let response = await db.query('SELECT CapabilityName, JobFamilyName FROM JobRoleDatabase.Capability JOIN JobFamily USING (CapabilityID);')
    return response;
}



exports.getTraingByBand = async () => {
    let response = await db.query('Select BandID, BandLevel, TrainingType,  BandName, TrainingName, TrainingLink FROM JobRoleDatabase.Band Join Band_Training USING (BandID) JOIN Training Using (TrainingID) GROUP BY BandName;')
    return response;
}

exports.getCapabilities = async () => {
    let response = await db.query('SELECT CapabilityID, CapabilityName, CapabilityLeadID, CapabilityLeadName FROM Capability JOIN CapabilityLeads USING (CapabilityLeadID);')
    return response
}
exports.getBands = async () => {
    let response = await db.query('SELECT * FROM Band ORDER BY BandLevel;')
    return response;
}

exports.getTakenBandLevels = async () => {
    let response = await db.query('SELECT BandLevel FROM Band;')
    return response;
}

exports.getJobRolesSpecifications = async (name) => {
    console.log(name);
    let results = await db.query(`SELECT RoleName, RoleSpec FROM JobRoleDatabase.Role where RoleName = '${name}' `)
}

exports.getBandCompetencies = async () => {
    let result = await db.query('SELECT BandName, BandLevel, CompetenciesName FROM Band JOIN Band_Competency USING(BandID) JOIN Competencies USING (CompetenciesID) ORDER BY BandLevel;');
    return result;
}

exports.addRole = async (Role) => {
    let results = await db.query('INSERT INTO Role SET ?', Role);
    return results.insertId;
}

exports.deleteRole = async (id) => {
    let results = await db.query('DELETE FROM Role WHERE RoleID = ?', id);
    return results;
}

exports.editRole = async (Role, id) => {
    let results = await db.query('UPDATE Role SET ? WHERE RoleID = ?', [Role, id]);
    return results;
}

exports.editBand = async (Band, id) => {
    let results = await db.query('UPDATE Band SET ? WHERE BandID = ?', [Band, id]);
    return results;
}

exports.getRoleWithCapabilityID = async (id) => {
    let response = await db.query('SELECT * FROM Role JOIN JobFamily USING(JobFamilyID) JOIN Capability USING(CapabilityID) WHERE RoleID = ?;', id)
    return response;
}

exports.getAssociatedTrainingIDsWithBand = async (id) => {
    let response = await db.query('SELECT TrainingID FROM Band JOIN Band_Training USING(BandID) WHERE BandID = ?;', id)
    return response;
}

exports.getAssociatedCompetenciesIDsWithBand = async (id) => {
    let response = await db.query('SELECT Band_Competency.CompetenciesID FROM Band JOIN Band_Competency USING(BandID) WHERE BandID = ?;', id)
    return response;
}

exports.getBand = async (id) => {
    let response = await db.query('SELECT * FROM Band WHERE BandID = ?;', id)
    return response;
}

exports.addJobFamily = async (newJobFamily) => {
    let results = await db.query('INSERT INTO JobFamily SET ?', newJobFamily)
    return results;
}

exports.deleteJobFamily = async (id) => {
    let results = await db.query('DELETE FROM JobFamily WHERE JobFamilyID = ?', id);
    return results;
}

exports.editJobFamily = async (JobFamily, id) => {
    let results = await db.query('UPDATE JobFamily SET ? WHERE JobFamilyID = ?', [JobFamily, id]);
    return results;
}

exports.getJobFamilyByID = async (id) => {
    let response = await db.query('SELECT JobFamilyName, CapabilityID FROM JobFamily WHERE JobFamilyID = ?', id);
    return response;
}

exports.deleteBand = async (id) => {
    try {
        let results = await db.query('DELETE FROM Band WHERE BandID = ?', id);
        return "success";
    } catch (e) {
        console.log(e)
        return e;
    }
}

exports.canDeleteBand = async (id) => {
    let results = await db.query('SELECT * FROM Band JOIN Role USING (BandID) WHERE BandID = ?;', id)
    return results.length === 0;
}

exports.deleteAssociatedTrainingsWithBand = async (id) => {
    let results = await db.query('DELETE FROM Band_Training WHERE BandID = ?', id);
    return results;
}

exports.deleteAssociatedCompetenciesWithBand = async (id) => {
    let results = await db.query('DELETE FROM Band_Competency WHERE BandID = ?', id);
    return results;
}

exports.addBand = async (Band) => {
    let results = await db.query('INSERT INTO Band SET ?', Band);
    return results.insertId;
}

exports.addBandTraining = async (trainingID, bandID) => {
    let results = await db.query('INSERT INTO Band_Training VALUES (?, ?)', [trainingID, bandID]);
    return results.insertId;
}


exports.addBandCompetency = async (competenciesID, bandID) => {
    let results = await db.query('INSERT INTO Band_Competency VALUES (?, ?)', [competenciesID, bandID]);
    return results.insertId;
}

exports.getCompetencies = async () => {
    let response = await db.query('SELECT * FROM Competencies;')
    return response;
}

exports.getCapabilityLeads = async () => {
    let response = await db.query('SELECT * FROM JobRoleDatabase.CapabilityLeads JOIN Capability USING (CapabilityLeadID);')
    return response;
}
exports.getTrainings = async () => {
    let response = await db.query('SELECT * FROM Training;')
    return response;
}

exports.addCapability = async (Capability) => {
    let results = await db.query('INSERT INTO Capability SET ?', Capability);
    return results.insertId;
}

exports.deleteCapability = async (id) => {
    try {
        let results = await db.query('DELETE FROM Capability WHERE CapabilityID = ?', id);
        return "success";
    } catch (e) {
        console.log(e)
        return e;
    }
}

exports.editCapability = async (Capability, id) => {
    let results = await db.query('UPDATE Capability SET ? WHERE CapabilityID = ?', [Capability, id]);
    return results;
}
exports.getCapabilityByID = async (id) => {
    let response = await db.query('SELECT CapabilityName, CapabilityLeadID FROM Capability WHERE CapabilityID = ?', id);
    return response;
}
exports.canDeleteCapability = async (id) => {
    let results = await db.query('SELECT * FROM Capability JOIN JobFamily USING (CapabilityID) WHERE CapabilityID = ?;', id)
    return results.length === 0;
}