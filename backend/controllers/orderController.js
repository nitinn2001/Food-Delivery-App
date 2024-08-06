import express from "express"
import orderModel from "../models/orderModel.js"
import { userModel } from "../models/userModel.js"
import Stripe from "stripe"

const placeOrder = async(req,res) => {
    const frontend_url = "http://localhost:5173"
    try{
        const newOrder = await orderModel.create({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await userModel.findByIdAndUpdate(req.body.userId,{$set:{cartItems:{}}})

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount: item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount: 2*100*80
            },
            quantity:1
        })

        const session= await Stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${(newOrder)._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${(newOrder)._id}`
        })

        res.json({
            success:true,
            session_url:session_url
        })
    }
    catch(err){
        console.log(err)
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export {placeOrder}