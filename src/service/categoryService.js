const categoryModel = require('../model/categoryModel');


const createCategoryService = async (req)=>{
    try {
        let postBody = req.body;
        let data = await  categoryModel.create(postBody);
        return {status:"success",data:data}
    }
    catch (e){
        return {status:"fail",data:e}.toString()
    }

}
const readCategoryService = async ()=>{
    try {
        let Match = {}
        let data = await categoryModel.find(Match);
        return {status:"success",data:data}
    }
    catch (e){
        return {status:"fail",data:e}.toString()
    }

}
const updateCategoryService = async (req)=>{
    try {
        let id = req.params.categoryID
        let Match = { _id:id}
        let postBody = req.body;
        let data = await categoryModel.updateOne(Match,postBody);
        return {status:"success",data:data}
    }
    catch (e){
        return {status:"fail",data:e}.toString()
    }

}
const deleteCategoryService = async (req)=>{
    try {
        let id = req.params.categoryId;
        let Match = {_id: id}
        let data = await categoryModel.deleteOne(Match);
        return {status:"success",data:data}

    }
    catch (e){
        return {status:"fail",data:e}.toString()
    }

}


module.exports={
    createCategoryService,
    readCategoryService,
    updateCategoryService,
    deleteCategoryService
}



