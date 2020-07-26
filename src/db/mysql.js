const mysql = require('mysql');
const {MYSQL_CONFIG} = require("../conf/db");

const con = mysql.createConnection(MYSQL_CONFIG);

con.connect();

function execSql(sql) {
    return new Promise((resolve)=>{
        con.query(sql,(err,result)=>{
            if(err){
                console.log('err', err);
                return;
            }
            resolve(result);
        })
    })
}

module.exports = {
    execSql,
    escapeSql: mysql.escape
};