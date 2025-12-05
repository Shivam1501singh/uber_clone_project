const mongoose=require("mongoose");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:3
        },
        lastname:{
            type:String,
            minlengt:3
        },

    },
    email:{
        type:String,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        select:false,

    },
    socketid:{
        type:String
    }
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password=await bcrypt.hash(this.password,10);
})
userSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}
userSchema.methods.generateAuthToken=function(){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:"1d"});
}

module.exports=mongoose.model('user',userSchema);
