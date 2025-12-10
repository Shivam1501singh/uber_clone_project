const jwt =require("jsonwebtoken")
const User = require("../models/user.model")

module.exports.authUser = async(req,res,next) =>{
    try{
        const authHeader = req.headers.authorization

        let token = null
        if(authHeader && authHeader.startsWith("Bearer")) token = authHeader.split(' ')[1];
        else if(req.cookies&&req.cookies.token) token = String(req.cookies.token).trim();
        if(!token)return res.status(401).json({message:"Unauthorized:missing token"})
        
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const userid = decoded&&decoded._id;
            if(!userid) return res.status(401).json({message:"Unauthorized :user not found"})
           
            const user = await User.findById(userid).select('-password');
            if(!user) return res.status(401).json({message:"Unauthorized :user not found"}) 
            
                req.user = user;
                next();
    }catch(err){
        console.error("Auth err:",err.message);
        return res.status(401).json({message:"Unauthorized"});
    }
}