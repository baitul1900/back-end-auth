const categoryModel = require("../models/categoryModel");


// create category 
exports.createCategory = async (req, res)=> {
    try {
        let reqBody = req.body;
        let result = await categoryModel.create(reqBody);
        return res.status(200).json({status : "success", data: result});
    }

    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}


// read category 
exports.categoryListController = async (req, res)=> {
    try {
        const category = await categoryModel.find();
        return res.status(200).json({status: "success", data: category});
    }
    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}

// update category 
exports.updatecategory = async (req, res)=> {
    try {
        let {id} = req.params;
        let {categoryName, des} = req.body;
        let result = await categoryModel.updateOne({_id: id}, req.body, {new: true});
        return res.status(200).json({status: "success", data: result});
    }
    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}


// delete category 
exports.deleteCategoryController = async (req, res)=> {
    try {
        let {id} = req.params;
        let query = {_id: id};
        let result = await categoryModel.deleteOne(query);
        return res.status(200).json({status: "success", data: result});
    }
    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}