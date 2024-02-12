const {ListByBrandService,ListByCategoryService, createProductService, ListBySearchService, readProductService,
    updateProductService, deleteProductService,detailProductService
} =require('../service/productService')
const ProductModel = require("../model/productModel");


exports.createProduct=async (req,res)=>{
    let result=await createProductService(req)
    return res.status(200).json(result)
}



exports.detailProduct=async (req,res)=>{
    let result=await detailProductService(req)
    return res.status(200).json(result)

}


exports.readProduct=async (req,res)=>{
    let result=await readProductService(req)
    return res.status(200).json(result)
}

exports.updateProduct=async (req,res)=>{
    let result=await updateProductService(req)
    return res.status(200).json(result)
}

exports.deleteProduct=async (req,res)=>{
    let result=await deleteProductService(req)
    return res.status(200).json(result)
}


exports.ListByBrand=async (req,res)=>{
    let result=await ListByBrandService(req)
    return res.status(200).json(result)
}


exports.ListByCategory=async (req,res)=>{
    let result=await ListByCategoryService(req)
    return res.status(200).json(result)
}


exports.ListByKeyword=async (req,res)=>{
    let result=await ListBySearchService(req)
    return res.status(200).json(result)
}
