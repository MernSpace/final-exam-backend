const express =require('express');
const router=express.Router()

const auth = require('../middilewere/auth')
const userController = require('../controller/userController')
const productController = require('../controller/productController')
const categoryController = require('../controller/categoryController')
const brandController = require('../controller/brandController')


//user
router.post("/create-user",userController.createUser)
router.post("/login-user/:email/:password",userController.loginUser)

router.get('/logout',userController.UserLogout)


//forget password
router.get('/userOtp/:email',userController.otpUser)
router.get('/verifylogin/:email/:otp',userController.verifyOtpUser)


router.get("/read-user", auth, userController.readUser)
router.post("/update-user/:userID", auth, userController.updateUser)
router.post("/delete-user:userID", auth, userController.deleteUser)



//category
router.post('/create-category',auth,categoryController.createCategory)
router.get('/read-category',categoryController.readCategory)


//brand
router.post('/create-brand',auth,brandController.createBrand);
router.get('/read-brand',brandController.readBrand)








//product

router.post("/create-product", productController.createProduct);
router.get('/read-product',productController.readProduct);
router.get('/product-detail/:productID',productController.detailProduct)
router.post('/update-product/:productID',auth,productController.updateProduct);
router.post('/delete-product/:productID',auth,productController.deleteProduct)


router.get('/product-by-category/:categoryID',productController.ListByCategory);
router.get('/product-by-brand/:brandID',productController.ListByBrand);
router.get('/product-by-search/:Keyword',productController.ListByKeyword);







module.exports = router