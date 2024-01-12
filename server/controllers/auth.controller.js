import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) =>{
    const {username, email, password} = req.body;
    const rounds = Number(process.env.ROUNDS);
    const hashedPassword = bcryptjs.hashSync(password, rounds)
    const newUser = new User({username, email, hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message:"User created successfully"});

    } catch(err){
        next(err);
    }

}