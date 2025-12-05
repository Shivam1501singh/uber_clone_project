const express=require('express');
const router=express.Router();
const {body}= require('express-validator');
const userController=require('../controler/user.controler');

router.post('/register',[
    body('email').isEmail().withMessage("please provide a valid email"),
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must be at least 3 characters long"),
    body('password').isLength({min:6}).withMessage("password must be at least 6 characters long")
], userController.registerUser

);
module.exports=router;
