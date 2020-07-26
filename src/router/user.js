const {setRedisVal} = require("../db/redis");
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


    if(method==="GET"){
        switch (path) {
            case "/api/user/postLogin": {       //todo test登录接口
                let userName = get(query, 'userName', '');
                let password = get(query, 'password', '');

                return postUserLogin({
                    userName,
                    password
                }).then((json) => {

                    let dataObj = json[0] || {};
                    if(dataObj.userName){

                        req.session.userName = userName;
                        req.session.password = password;
                        setRedisVal(req.jessionId, req.session);
                        return new SuccessModel(dataObj);
                    }else {
                        return new ErrorModal(null,'登录失败');
                    }
                })
            }
            case "/api/user/loginTest":{        //todo test接口
                if(req.session.userName){
                    return Promise.resolve(
                        new SuccessModel({
                            session:req.session
                        })
                    )
                }
                return Promise.resolve(
                    new ErrorModal(null, '尚未登录')
                );
            }
            default:
                break;
        }
    }else if (method==="POST"){
        switch (path) {
            case "/api/user/postLogin": {
                let {userName, password} = body;

                return postUserLogin(body).then((json) => {
                    let dataObj = json[0] || {};
                    if(dataObj.userName){
                        req.session.userName = userName;
                        req.session.password = password;
                        setRedisVal(req.jessionId, req.session);
                        return new SuccessModel(dataObj);
                    }else {
                        return new ErrorModal(null,'登录失败');
                    }

                })
            }

        }
    }
}

module.exports = handleUserRouter;