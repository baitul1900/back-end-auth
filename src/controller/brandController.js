const brandModel = require("../models/brandModel");
const {createBrandService} = require("../service/brandService");


exports.createBrand = async (req, res)=> {
    try {
        let result = await createBrandService(req);
        return res.status(200).json(result);
    }

    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}

// read brand lis 
exports.brandListController = async (req, res)=> {
    try {
        const brand = await brandModel.find();
        return res.status(200).json(brand);
    }
    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}

// update brand 
exports.updateBrandController = async (req, res)=> {
    try {
        let {id} = req.params;
        let {brandName, des} = req.body;
        let result = await brandModel.updateOne({_id: id}, req.body, {new: true});
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}

// delete brand 
exports.deleteBrandController = async (req, res)=> {
    try {
        let {id} = req.params;
        let query = {_id: id};
        let result = await brandModel.deleteOne(query);
        return res.status(200).json({status: "success", data: result});
    }
    catch (e) {
        return res.status(500).json({status: "fail", messages: "something went wrong"})
    }
}