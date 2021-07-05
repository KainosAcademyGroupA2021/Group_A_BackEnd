const mysql = require('mysql')
const dbconfig = require('./dbconfig.json')
const util = require('util')

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