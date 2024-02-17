const express = require('express');
const router = express.Router();

// import auh verification for oken helpp
const authVerify = require('../middlewares/authVerification');

// all imports about user 
const userController = require('../controller/userController');


// user registration routes
router.post('/user-registration', userController.userRegistration);
router.post('/login', userController.userLoginController);
router.get('/profile', authVerify, userController.profileDetails);
router.post('/updateProfile', authVerify, userController.updateProfile);
router.get('/account-recover/:email', userController.accountRecoverController);
router.get('/verify-otp/:email/:otp', userController.verifyOtpController);



module.exports = router;