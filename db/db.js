const mongoose=require('mongoose');

function connectdb(){
    mongoose.connect(process.env.DB_connect).then(()=>{
        console.log("database connected...")
    }).catch((err)=>{
        console.log("databases connection failed",err)
    })
}

module.exports=connectdb;