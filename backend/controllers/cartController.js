import express from "express"
import { userModel } from "../models/userModel.js"

//add to cart

// Add to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartItems;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            console.log("!!!1")
            cartData[req.body.itemId] +=1
        }

        await userModel.findByIdAndUpdate(req.body.userId,{ $set: { cartItems: cartData } })
        console.log(cartData)
        res.json({success:true,message:"Updated Successfully"})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"error"})
    }
};

const removeFromCart = async(req,res) => {
    try{
        let userData = await userModel.findOne({_id:req.body.userId})
        let cartData = await userData.cartItems

        console.log("before removal",cartData)

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1
        }

        await userModel.findByIdAndUpdate(req.body.userId, {$set:{cartItems:cartData}})
        console.log("after removal",cartData)
        res.json({success:true,message:"Removal successful"})

    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"error"})
    }
}

const fetchFromCart = async (req, res) => {
    try {
        const { userId } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartItems || {}; // Initialize cartItems if it doesn't exist

        res.json({ success: true, cartItems: cartData });
    } catch (err) {
        console.error('Error in fetchFromCart:', err.message);
        res.json({ success: false, message: "Fetch failed" });
    }
};

export {addToCart,removeFromCart,fetchFromCart}