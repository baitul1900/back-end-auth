

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
        validate: {
            validator: function(v) {
                return /^\+88\s\d{5}\s\d{2}\s\d{2}\s\d{2}$/.test(v);
            },
            message: props => `${props.value} is not a valid Bangladeshi phone number`
        }
    },
    password: {
        type: String,
        required: true
    },
    image : {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }


}, {versionKey : false, timestamps: true})

const userModel = mongoose.model('users', userData);

module.exports = userModel