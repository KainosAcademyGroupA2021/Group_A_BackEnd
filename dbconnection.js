const mysql = require('mysql')
const dbconfig = require('./dbconfig.js')
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
    console.log(process.env.GROUPA_AWS_HOST_NAME)
    let results = await db.query('SELECT * FROM JobRoleDatabase.Persons;') 
    return results;
}