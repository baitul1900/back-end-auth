

const mongoose = require("mongoose");
const {Schema} = mongoose;

const userData = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 11
    },
    password: {
        type: String,
        required: true
    },
    image : {
        type: String
    }


}, {versionKey : false, timestamps: true})

const userModel = mongoose.model('users', userData);

module.exports = userModel