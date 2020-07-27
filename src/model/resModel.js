
class DataModal {
    constructor(data,msg) {
        if(arguments.length===1){
            return{
                success:true,
                data
            }
        }else if(arguments.length===2){
            return {
                success: false,
                msg
            }
        }
        return {
            success: false,
            msg:'暂时数据'
        }
    }
}


class SuccessModel extends DataModal{
    constructor(data) {
        return super(data);
    }
}

class ErrorModal extends DataModal{
    constructor(data,msg) {
        return super(data, msg);
    }
}


module.exports = {
    SuccessModel,
    ErrorModal
};