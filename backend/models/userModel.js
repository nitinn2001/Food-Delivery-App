import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cartItems:{type:Object,default:{}}
},{minimize:false})

export const userModel = mongoose.model("user",userSchema)
