import mongoose from "mongoose";
import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/userModel.js";
import axios from "axios"
import validator from "validator";

const loginUser = async (req, res) => {
    const {email,password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"Please register if you haven't"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = createToken(user._id)


        return res.json({
            success:true,
            token
        })


    }
    catch(err){
        console.log(err)
        return res.json({
            success:false,
            message:err
        })
    }


}

const createToken = (id) => {
    const JWT_SECRET = "random#secret"
     return jwt.sign({id},JWT_SECRET)
}

const registerUser = async (req, res) => {
    const url = "http://localhost:4000"
    const { name, email, password } = req.body

    const exists = await userModel.findOne({ email });
    try {
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter a valid password"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await userModel.create({
            name:name,
            email:email,
            password:hashedPassword
        })

        const token = createToken(newUser._id)
        res.json({
            success:true,
            token
        })
    }
    catch(err){
        console.log(err)
        res.json({
            success:false,
            message:err
        })
    }
}

export { loginUser, registerUser }