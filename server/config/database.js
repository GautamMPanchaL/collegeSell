import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, '../.env')});

exports.connect = ()=> mongoose.connect(process.env.URI).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{console.log(err)});
