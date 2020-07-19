const {SuccessModel} = require("../model/resModel");
const {getBlogList, addBlog} = require('../controller/blog');

function handleBlogRouter(req, res) {

    //base data
    let method = req.method;
    let path = req.path;
    let query = req.query;

    //second base data
    let {id} = query;

    //equal data
    let dataObj = null;

    if(method==="GET"){
        switch (path) {
            case "/api/blog/getList":
                dataObj = new SuccessModel(getBlogList(id));
                break;
        }
    }else if (method==="POST"){
        switch (path) {
            case "/api/blog/addBlog":
                dataObj = new SuccessModel(addBlog(id));
                break;
        }
    }


    return dataObj;
}

module.exports = handleBlogRouter;