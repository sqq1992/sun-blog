const env = process.env.NODE_ENV;

let MYSQL_CONFIG = {};

if(env==="dev"){
    MYSQL_CONFIG = {
        host:'localhost',
        user:'root',
        password:'xuwei466',
        port:'3306',
        database:'blog',
    };
}else if(env==="production"){
    MYSQL_CONFIG = {
        host:'localhost',
        user:'root',
        password:'xuwei466',
        port:'3306',
        database:'blog',
    };
}

module.exports = {
    MYSQL_CONFIG
};


