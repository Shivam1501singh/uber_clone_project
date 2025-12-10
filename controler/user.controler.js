
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
module.exports.registerUser = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const{fullname,email,password} = req.body;

    const isUserExists = await userModel.findOne({email});
    if(isUserExists){
        return res.status(400).json({message:'User with this email already exists'});
    }
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password
    })
    const token = user.generateAuthToken();
    res.status(201).json({token,user}); 
}

module.exports.loginUser = async(req,res)=>{
    try{

        const{email,password} = req.body;
        console.log("login attempt for",email);
        const user = await userModel.findOne({email}).select('+password')
        if(!user) return res.status(401).json({message:'invalid email & pasword'})
            const ok=await user.comparePassword(password)
        console.log( " Password match:",ok)
        if(!ok) return res.status(401).json({message: "invalid email or password"})
        const token = user.generateAuthToken()
    res.cookie("token",token,{httpOnly:true})
    return res.status(200).json({token,user})
    }catch(err){
    console.error("login error:",err);
    return res.status(500).json({message:"Server error"})
    

}
}

module.exports.getUserProfile = async(req,res)=>{
   return res.status(200).json({user:req.user})
}
