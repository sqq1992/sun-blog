const fs = require('fs');
const readLine = require('readline');
const {AccessLogPath} = require("../conf/global");


const accessLogReadStream = fs.createReadStream(AccessLogPath);

const rl = readLine.createInterface({
    input: accessLogReadStream
});

let str = '';
rl.on("line", (lineData) => {
    if(lineData){
        str += lineData;
        console.log('lineData', lineData);
    }
});

rl.on('close',()=>{
    console.log('close-str', str);
})