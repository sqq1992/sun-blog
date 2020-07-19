const {postUserLogin} = require("../controller/user");
const {SuccessModel} = require("../model/resModel");

function handleUserRouter(req, res) {

    //base data
    let method = req.method;
    let path = req.path;


    //equal data
    let dataObj = null;

    if(method==="GET"){
        switch (path) {
            default:
                break;
        }
    }else if (method==="POST"){
        let body = req.body;
        switch (path) {
            case "/api/user/postLogin":
                dataObj = new SuccessModel(postUserLogin(body));
                break;
        }
    }

    return dataObj;
}

module.exports = handleUserRouter;