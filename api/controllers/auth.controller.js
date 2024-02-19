import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import {errorHandler} from '../utils/error.js';
dotenv.config();

export const signup= async (req,res,next)=>
{  
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password);   
    const newUser=new User({username,email,password :hashedPassword})
    try
    {
    await newUser.save();
    res.status(201).json("User Created successfully");
    }
    catch(err)
    {
       next(err);
    }
};
export const signin=async (req,res,next)=>
{ 
     const {email,password} =req.body;
     try {
        const validUser =await User.findOne({email});
        if(!validUser) return next(errorHandler(404,"Not Found"));
        const validPassword =bcryptjs.compareSync(password,validUser.password);
         if (!validPassword)return next(errorHandler(403,'Wrong Credentials !'));
         const token=jwt.sign({id:validUser._id},process.env.JWTSECRET);
         const {password:pass, ...rest}=validUser._doc;
         res.cookie('access_token',token,{httpOnly:true})
         .status(200).json(rest);
  } catch (error) {
        next(error);
     }

};
 

