const express = require('express');
const router = express.Router();

// all imports about user 
const userController = require('../controller/userController');


// user registration routes
router.post('/user-registration', userController.userRegistration);



module.exports = router;