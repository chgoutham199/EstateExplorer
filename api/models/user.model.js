import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a Username"],
        unique:true
    },
    email:{
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