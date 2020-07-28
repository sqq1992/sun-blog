const {ErrorModal} = require("../model/resModel");

async function checkIsNotLogin(ctx,next){
    if(ctx.session.userName){
        await next();
        return;
    }
    ctx.body = new ErrorModal(null, '尚未登录');
}


module.exports = {
    checkIsNotLogin
};