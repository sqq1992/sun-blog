const redis = require('redis');
const {REDIS_CONFIG} = require("../conf/db");

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);


redisClient.on('error', (err) => {
    console.error(err);
});


function setRedisVal(key, val) {
    if(typeof val==="object"){
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

function getRedisVal(key) {
    return new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err);
                return;
            }

            if(val){
                try {
                    resolve(JSON.parse(val));
                }catch (e) {
                    resolve(val);
                }
            }else {
                resolve(val);
            }
        })

    })
}


module.exports = {
    setRedisVal,
    getRedisVal
};