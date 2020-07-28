
const {execSql,escapeSql} = require("../db/mysql");

async function postUserLogin(body){
    let {userName, password} = body;

    const sql = `select userName, realname from users where userName=${escapeSql(userName)} and password=${escapeSql(password)} `;

    // console.log('sql is', sql);

    return await execSql(sql);
}


module.exports = {
    postUserLogin
};