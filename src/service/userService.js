const userModel = require('../model/userModel')

const otpModel = require('../model/otpModel')
const {EncodeToken} = require("../utility/tokenHelper");
const EmailSend = require("../utility/mailHelper");




const UserCreateService = async (req) => {
    try {
        let postBody = req.body;
        let data = await userModel.create(postBody)
        return {status:"success", data:data}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}



const userLoginService = async (req)=>{
    try {

        let email=req.params.email;
        let password=req.params.password;

        // User Count
        let total=await userModel.find({email:email,password:password}).count('total');
        if(total===1){

            // User ID Read
            let user_id=await userModel.find({email:email,password:password}).select('_id');

            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())

            return {status:"success", message:"Login success",token:token}

        }
        else{
            return {status:"fail", message:"Something Went Wrong"}
        }

    }
    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}



const userProfileService = async (req)=>{
    try {
        let userID = req.headers.user_id
        let Query = {_id:userID}
        let data = await userModel.find(Query);
        return {status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}




const userUpdateService = async (req)=>{
    try {
        let postBody = req.body;
        let userID = req.headers.user_id;
        let match = {_id: userID}
        let data = await userModel.updateOne(match,postBody)
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

const userDeleteService = async (req)=>{
    try {

        let userID = req.headers.user_id;
        let match = {_id:userID}
        let data = await userModel.deleteOne(match)
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}





const userOTPService = async (req) => {
    try {
        let email=req.params.email;
        let code=Math.floor(100000+Math.random()*900000);

        let EmailText=`Your Verification Code is= ${code}`
        let EmailSubject='Email Verification'

        await EmailSend(email,EmailText,EmailSubject);

        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:"success", message:"6 Digit OTP has been send"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

const verifyOTPService = async (req) => {

    try {
        let email=req.params.email;
        let otp=req.params.otp;

        // User Count
        let total=await otpModel.find({email:email,otp:otp}).count('total');
        if(total===1){

            // User ID Read
            let user_id=await userModel.find({email:email}).select('_id');

            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())

            // OTP Code Update To 0
            await otpModel.updateOne({email:email},{$set:{otp:"0"}})

            return {status:"success", message:"Valid OTP",token:token}

        }
        else{
            return {status:"fail", message:"Invalid OTP"}
        }

    }catch (e) {
        return {status:"fail", message:"Invalid OTP"}
    }


}







module.exports={
    UserCreateService,
    userProfileService,
    userUpdateService,
    userDeleteService,
    userLoginService,
    verifyOTPService,
    userOTPService
}