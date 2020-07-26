const {checkIsNotLogin} = require("../utils/authUtils");
const {get} = require("lodash");
const {SuccessModel, ErrorModal} = require("../model/resModel");
const {getBlogList, addBlog, getDetailById, updateBlog, delBlog} = require('../controller/blog');

function handleBlogRouter(req, res) {

    //base data
    let method = req.method;
    let path = req.path;
    let query = req.query;

    //second base data
    let id = get(query, 'id', '');
    let body = get(req, 'body', {});

    //equal data
    let dataObj = null;

    if(method==="GET"){
        switch (path) {
            case "/api/blog/getList": {
                let author = get(query, 'author', '');
                let title = get(query, 'title', '');

                return getBlogList(author, title).then((json)=>{
                    return new SuccessModel(json);
                })
            }
            case "/api/blog/getDetailById":{

                return getDetailById(id).then((json)=>{
                    return new SuccessModel(json[0] || {});
                })
            }


        }
    }else if (method==="POST"){
        switch (path) {
            case "/api/blog/addBlog": {

                if(checkIsNotLogin(req)){
                    return checkIsNotLogin(req);
                }

                return addBlog(body).then((json) => {
                    if(json.insertId){
                        return new SuccessModel({
                            id: json.insertId
                        });
                    }else {
                        return new ErrorModal(null,'添加失败');
                    }
                })
            }
            case "/api/blog/updateBlog": {

                if(checkIsNotLogin(req)){
                    return checkIsNotLogin(req);
                }

                return updateBlog(body).then((json) => {
                    if (json.affectedRows > 0) {
                        return new SuccessModel({
                            id: json.affectedRows
                        });
                    } else {
                        return new ErrorModal(null, '修改失败');
                    }
                })
            }
            case "/api/blog/delBlog": {

                if(checkIsNotLogin(req)){
                    return checkIsNotLogin(req);
                }

                return delBlog(body).then((json) => {
                    console.log('delBlog', json);
                    if (json.affectedRows > 0) {
                        return new SuccessModel({
                            id: json.affectedRows
                        });
                    } else {
                        return new ErrorModal(null, '删除失败');
                    }

                })
            }
        }
    }


    return dataObj;
}

module.exports = handleBlogRouter;