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
    avatar:
    {
        type :String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fblank-profile&psig=AOvVaw3cWlzoNGkFt-Tta11uncT_&ust=1708789188015000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjDgPflwYQDFQAAAAAdAAAAABAE",
    },
},{timestamps:true});

const User = mongoose.model('User',userSchema);
export default User;