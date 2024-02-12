const {createCategoryService,readCategoryService,updateCategoryService,deleteCategoryService} = require('../service/categoryService')


exports.createCategory = async (req, res)=>{
    let result = await createCategoryService(req)
    return res.status(200).json(result)
}

exports.readCategory = async (req, res)=>{
    let result = await readCategoryService(req)
    return res.status(200).json(result)
}

exports.updateCategory = async (req, res)=>{
    let result = await updateCategoryService(req)
    return res.status(200).json(result)
}

exports.deleteCategory = async (req, res)=>{
    let result = await deleteCategoryService(req)
    return res.status(200).json(result)
}