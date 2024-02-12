const productModel = require('../model/productModel')
const mongoose =require('mongoose');
const ProductModel = require("../model/productModel");
const ObjectId=mongoose.Types.ObjectId;







const createProductService = async (req)=>{
    try{
        let postBody = req.body;
        let data = await productModel.create(postBody);
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()

    }
}



const detailProductService = async (req)=>{
    try{
        let id = req.params.productID
        let Match = {_id:id}
        let data =await ProductModel.findOne(Match)
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()

    }
}


const readProductService = async (req)=>{
    try{
        let Match = {}
        let data = await productModel.find(Match);
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()

    }
}

const updateProductService = async (req)=>{
    try{
        let id = req.params.productID;
        let Match = {_id:id}
        let postBody = req.body;

        let data = await productModel.updateOne(Match,postBody);
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()

    }
}

const deleteProductService = async (req)=>{
    try{
        let id = req.params.productID;
        let Match = {_id: id}
        let data = await productModel.deleteOne(Match);
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()

    }
}





const ListByBrandService = async (req) => {

    try {

        let BrandID=new ObjectId(req.params.brandID);

        let MatchStage={$match:{brandID:BrandID}}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};


        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}

        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


        // Query
        let data= await  productModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage

        ])
        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}

const ListByCategoryService = async (req) => {
    try {

        let CategoryID=new ObjectId(req.params.categoryID);
        let MatchStage={$match:{categoryID:CategoryID}}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  productModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}






const ListBySearchService = async (req) => {
    try{
        let SearchRegex={"$regex":req.params.Keyword, "$options":"i"}
        let SearchParams=[{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery={$or:SearchParams}

        let MatchStage={$match:SearchQuery}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  productModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }

}





module.exports= {
    ListByBrandService,
    ListByCategoryService,
    createProductService,
    ListBySearchService,
    readProductService,
    updateProductService,
    deleteProductService,
    detailProductService
}
