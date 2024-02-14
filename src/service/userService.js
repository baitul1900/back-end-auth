const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');


const userProfileCreate = async (req) => {
    try {
        let password = await bcrypt.hash(req.body.password, 10);
        let reqBody = req.body;
        reqBody.password = password;
        await userModel.create(reqBody);
        return {status: "success", messages: "user created"}
    }

    catch (e) {
        return {status: "fail", messages: "something went wrong"}
    }
}


module.exports = {
    userProfileCreate
}