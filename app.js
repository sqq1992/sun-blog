const {get} = require('lodash');
const querystring = require('querystring');
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const {writeAccessLog} = require("./src/utils/logs");
const {getRedisVal} = require("./src/db/redis");
const {getCookieExpires} = require("./src/utils/utils");
const {getFormatCookie} = require("./src/utils/utils");

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

    //set 返回格式
    res.setHeader('Content-type', 'application/json');

    // base data
    let method = req.method;
    let url = req.url;

    // second base data
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1]);
    req.cookie = getFormatCookie(req.headers.cookie);

    // set session
    let JESSIONID = req.cookie.JESSIONID;
    let isNeedSetCookie = false;
    if(!JESSIONID){
        isNeedSetCookie = true;
        JESSIONID = `${+new Date()}_${Math.random()}`;
    }
    req.jessionId = JESSIONID;

    //todo 写日志
    writeAccessLog(`${method} -- ${url} -- ${req.headers['user-agent']} -- ${Date.now()}`);

    getRedisVal(req.jessionId).then((sessionData)=>{       //获取redis里的session值
        req.session = sessionData || {};
        // console.log('req.session', req.session);

        return getPostData(req);                    //获取请求的接口里的参数数据
    }).then((postData)=>{
        // console.log('postData', postData);
        req.body = postData;

        let blogDataResult = handleBlogRouter(req, res);
        if(blogDataResult){
            blogDataResult.then((dataJson)=>{

                if(isNeedSetCookie){
                    res.setHeader('Set-Cookie',`JESSIONID=${req.jessionId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(JSON.stringify(dataJson));
            })
            return;
        }

        let userDataResult = handleUserRouter(req, res);
        if(userDataResult){
            userDataResult.then((dataJson)=>{

                if(isNeedSetCookie){
                    res.setHeader('Set-Cookie',`JESSIONID=${req.jessionId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(JSON.stringify(dataJson));
            })
            return;
        }


        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 NOT Found\n");
        res.end();
    })


};


module.exports = ServerHandle;