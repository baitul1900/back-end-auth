const mongoose = require('mongoose');

const categoryData = mongoose.Schema({
    categoryName: {type : String, required : true, unique:true},
    categoryImg : {type : String, required : true}
},

{timestamps: true, versionKey : false}

);

const categoryModel = mongoose.model('categories', categoryData);
module.exports = categoryModel;