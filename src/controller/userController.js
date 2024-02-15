const {userProfileCreate, loginUserService} = require('../service/userService');


exports.userRegistration = async (req, res) => {
    try {
        let resBody = await userProfileCreate(req);
        return res.status(200).json(resBody);
    }
    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}

exports.userLoginController = async (req, res)=> {
    try {
        let result = await loginUserService(req);
        if(result['status']=== "success") {
            let cookieOption={expires:new Date(Date.now()+24*6060*1000), httpOnly:false}
    
            res.cookie('token',result['token'],cookieOption)
            return res.status(200).json(result)
        }
        
    }

    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}