import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const signup= async (req,res,next)=>
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

 export default signup;

