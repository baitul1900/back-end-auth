const bcrypt = require('bcrypt');
const { encodeToken } = require("../helpers/jwtAuth");
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



const loginUserService = async (req) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        // Generate token
        const token = encodeToken(user.email, user._id);
        return { status: "success", message: "User logged in", token };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    userProfileCreate,
    loginUserService
}