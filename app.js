const querystring = require('querystring');
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

function getPostData(req) {
    return new Promise((resolve, reject) => {
        let method = req.method;

        if(method==="POST" && req.headers['content-type']==="application/json"){
            let postData = '';
            req.on('data',chunk => {
                postData += chunk.toString();
            })
            req.on("end",()=>{
                if(postData){
                    resolve(JSON.parse(postData))
                }else {
                    resolve({})
                }
            })
        }else {
            resolve({});
        }
    });
}


const ServerHandle = (req, res) => {

    // base data
    let method = req.method;
    let url = req.url;

    // second base data
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1]);

    //set data
    res.setHeader('Content-type', 'application/json');


    //todo test data
    console.log('realData',{
        url,
        method,
        path:req.path,
        query:req.query,
    })

    //todo return data
    getPostData(req).then((postData)=>{
        console.log('postData', postData);
        req.body = postData;

        let blogData = handleBlogRouter(req, res);
        if(blogData){
            res.end(JSON.stringify(blogData));
            return;
        }

        let userData = handleUserRouter(req, res);
        if(userData){
            res.end(JSON.stringify(userData));
            return;
        }


        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 NOT Found\n");
        res.end();
    })


};


module.exports = ServerHandle;