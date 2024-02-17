const bcrypt = require('bcrypt');
const { encodeToken } = require("../helpers/jwtAuth");
const userModel = require('../models/userModel');
const SendEmailUtility = require('../utility/SendEmailUtility');
const OTPModels = require('../models/OTPMode');


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

const readProfileService = async (req)=> {
    try {
        let email = req.headers['email'];
        let userProfile = await userModel.findOne({ email }); // Assuming you only want to find one user profile
        if (userProfile) {
            return { status: "success", data: userProfile };
        } else {
            return { status: "fail", message: "User profile not found" };
        }
    }
    catch (e) {
        return {status:"fail",message:'something went wrong'}
    }
}

const updateUserService = async (req)=> {
    try {
        let email = req.headers['email'];
        let reqBody = req.body;

        reqBody.email = email;
        
        await userModel.updateOne({email: email}, {$set: reqBody}, {upsert:true})
        return {status: "success", message: "profile Updated"}
    }
    catch (e) {
        return {status:"fail",message:'something went wrong'}
    }
}


const recoverAccountService = async (req) => {
    try {
        let email = req.params['email'];
        let otpCode = Math.floor(1000 + Math.random() * 9000);
        let emailText = `Your OTP code is ${otpCode}`;
        let emailSub = "OTP Code";

        // Check if user exists
        let userCount = await userModel.countDocuments({ email });
        if (userCount !== 1) {
            return { status: "fail", message: "User not found" };
        }

        // Send OTP via email
        await SendEmailUtility(email, emailText, emailSub);

        // Save OTP code to the database
        await OTPModels.findOneAndUpdate({ email }, { otp: otpCode }, { upsert: true });

        return { status: "success", message: "OTP sent" };
    } catch (error) {
        console.error(error);
        return { status: "fail", message: "Something went wrong" };
    }
};




const verifyOtpService = async (req) => {
    try {
        let email = req.params['email'];
        let otpCode = req.params['otp'];
        let status = 0;
        let statusUpdate = 1;

    let result = await OTPModels.findOne({email: email, otp: otpCode, status: status}).count();

if(result === 1) {
    await OTPModels.updateOne({email: email, otp: otpCode, status: status}, {status: statusUpdate})
    return {status: "success", message: "OTP verified"}
} else {
    return {status: "fail", message: "OTP not match"}
}
    }
     catch (e) {
        return {status:"fail",message:'something went wrong service function'}
     }
}











module.exports = {
    userProfileCreate,
    loginUserService,
    readProfileService,
    updateUserService,
    recoverAccountService,
    verifyOtpService
}