const fs = require('fs');
const {AccessLogPath} = require("../conf/global");

function createWriteStream(fullFileName) {
    const writeStream = fs.createWriteStream(fullFileName,{
        flags:'a'
    })
    return writeStream;
}

const accessWriteStream = createWriteStream(AccessLogPath);

function writeAccessLog(log) {
    accessWriteStream.write(log + '\n');
}

module.exports = {
    writeAccessLog
};