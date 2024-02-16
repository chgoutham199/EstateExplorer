import mongoose from "mongoose";
import { string } from "postcss-selector-parser";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a Username"],
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
},{timestamps:true});

const User = mongoose.model('User',userSchema);
export default User;