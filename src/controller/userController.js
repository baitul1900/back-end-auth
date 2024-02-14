const {userProfileCreate} = require('../service/userService');


exports.userRegistration = async (req, res) => {
    try {
        let resBody = await userProfileCreate(req);
        return res.status(200).json(resBody);
    }
    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}