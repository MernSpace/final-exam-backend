const mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
        title:{type:String,required:true},
        image:{type:String,required:true},
        remark:{type:String,required:true},
        categoryID:{type:mongoose.Schema.Types.ObjectId,required:true},
        brandID:{type:mongoose.Schema.Types.ObjectId,required:true}
    },
    {timestamps:true,versionKey:false}
)
const ProductModel=mongoose.model('products',DataSchema)
module.exports=ProductModel