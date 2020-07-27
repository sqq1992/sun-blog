const {ErrorModal} = require("../model/resModel");

function checkIsNotLogin(req){
    if(!req.session.userName){
        return Promise.resolve(
            new ErrorModal(null, '尚未登录')
        );
    }
    return null;
}


module.exports = {
    checkIsNotLogin
};