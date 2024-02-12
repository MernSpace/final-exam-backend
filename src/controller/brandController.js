const { createBrandService, readBrandService, updateBrandService,
    deleteBrandService} = require('../service/brandService')


exports.createBrand = async (req,res)=>{
    let result = await createBrandService(req)
    return res.status(200).json(result)
}


exports.readBrand = async (req,res)=>{
    let result = await readBrandService(req)
    return res.status(200).json(result)
}



exports.updateBrand = async (req,res)=>{
    let result = await updateBrandService(req)
    return res.status(200).json(result)
}


exports.deleteBrand = async (req,res)=>{
    let result = await deleteBrandService(req)
    return res.status(200).json(result)
}