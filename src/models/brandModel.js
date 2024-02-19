const mongoose = require('mongoose');

const brandData = mongoose.Schema({
    brandName: {type : String, required : true, unique:true},
    brandImg : {type : String, required : true}
},

{timestamps: true, versionKey : false}

);

const brandModel = mongoose.model('brands', brandData);
module.exports = brandModel;
