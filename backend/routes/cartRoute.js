import express from "express"
import mongoose from "mongoose"
import { addToCart, fetchFromCart, removeFromCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const cartRouter = express.Router()

cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.post('/remove',authMiddleware,removeFromCart)
cartRouter.post('/get',authMiddleware,fetchFromCart)

export default cartRouter