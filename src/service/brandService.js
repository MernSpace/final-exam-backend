const brandModel = require('../model/brandModel');


const createBrandService = async (req)=>{
    try {
        let postBody = req.body;
        let data = await brandModel.create(postBody)
        return {status:"success",data:data}

    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}



const readBrandService = async ()=>{
    try {
        let Match = {}
        let data = await brandModel.find(Match);

        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}



const updateBrandService = async ()=>{
    try {

    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}
const deleteBrandService = async ()=>{
    try {

    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}



module.exports={
    createBrandService,
    readBrandService,
    updateBrandService,
    deleteBrandService

}