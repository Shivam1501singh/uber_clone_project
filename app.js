require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/user.routers');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));




const PORT =1010;

const connectdb=require('./db/db');

connectdb();

app.get("/",(req,res)=>{
    res.send("backened page is working");
})

app.use('/users',userRoutes);


module.exports=app;
