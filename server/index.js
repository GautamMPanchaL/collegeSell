import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.route.js"
dotenv.config();

mongoose.connect(process.env.URI).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{console.log(err)});

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
});

app.use("/api/user", userRouter);
app.use("/api", authRouter);

app.use((error, req, res, next) =>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})