const {get} = require("lodash");
const {postUserLogin} = require("../controller/user");
const {SuccessModel, ErrorModal} = require("../model/resModel");

function handleUserRouter(req, res) {

    //base data
    let method = req.method;
    let path = req.path;
    let query = req.query;

    //second base data
    let body = get(req, 'body', {});

    //equal data
    let dataObj = null;

    if(method==="GET"){
        switch (path) {
            default:
                break;
        }
    }else if (method==="POST"){
        switch (path) {
            case "/api/user/postLogin": {
                return postUserLogin(body).then((json) => {

                    let dataObj = json[0] || {};
                    if(dataObj.userName){
                        return new SuccessModel(dataObj);
                    }else {
                        return new ErrorModal(null,'登录失败');
                    }

                })
            }

        }
    }

    return dataObj;
}

module.exports = handleUserRouter;