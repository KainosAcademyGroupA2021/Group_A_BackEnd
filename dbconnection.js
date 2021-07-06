const mysql = require('mysql')
const dbconfig = require('./dbconfig.json')
const express = require("express");
const cors = require('cors');
const app = express()
const util = require('util')

const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

exports.getPeopleList = async () => {
    let results = await db.query('SELECT * FROM JobRoleDatabase.Persons;')
    return results;
}

exports.getJobRoles = async () => {
  let response = await db.query('SELECT * FROM JobRoleDatabase.Role;')
  return response;
}
