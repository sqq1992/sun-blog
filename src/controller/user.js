
const {execSql} = require("../db/mysql");

function postUserLogin(body){
    let {userName, password} = body;

    const sql = `select userName, realname from users where userName='${userName}' and password='${password}'`;

    return execSql(sql);
}


module.exports = {
    postUserLogin
};