function getFormatCookie(str) {
    let result = {};
    let arr = str ? str.split(';') : [];

    arr.forEach((elem)=>{
        if(elem){
            let tempArr = elem.split('=');
            result[tempArr[0].trim()] = tempArr[1].trim();
        }
    })

    return result;
}

function getCookieExpires() {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

module.exports = {
    getFormatCookie,
    getCookieExpires
};