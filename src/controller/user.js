


function postUserLogin(body){
    let {userName, passWord} = body;
    return{
        userName,
        passWord
    }
}


module.exports = {
    postUserLogin
};