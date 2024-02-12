const {UserCreateService, userProfileService, userUpdateService, userDeleteService, userLoginService, userOTPService,
    verifyOTPService
}= require('../service/userService')



exports.createUser=async (req,res)=>{
    let result= await UserCreateService(req)
    return res.status(200).json(result)
}

exports.loginUser=async (req,res)=>{
    let result=await userLoginService(req)

    if(result['status']==="success"){

        // Cookies Option
        let cookieOption={expires:new Date(Date.now()+24*6060*1000), httpOnly:true, secure: true,}

        // Set Cookies With Response
        res.cookie('token',result['token'],cookieOption)
        return res.status(200).json(result)

    }else {
        return res.status(200).json(result)
    }
}





exports.UserLogout=async (req,res)=>{
    let cookieOption={expires:new Date(Date.now()-24*6060*1000), httpOnly:false}
    res.cookie('token',"",cookieOption)
    return res.status(200).json({status:"success"})
}




exports.readUser=async (req,res)=>{
    let result=await userProfileService(req)
    return res.status(200).json(result)
}

exports.updateUser=async (req,res)=>{
    let result=await userUpdateService(req)
    return res.status(200).json(result)
}



exports.deleteUser=async (req,res)=>{
    let result=await userDeleteService(req)
    return res.status(200).json(result)
}



exports.otpUser=async (req,res)=>{
    let result=await userOTPService(req)
    return res.status(200).json(result)
}


exports.verifyOtpUser=async (req,res)=>{
    let result=await verifyOTPService(req)
    return res.status(200).json(result)
}