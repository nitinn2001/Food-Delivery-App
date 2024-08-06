import foodModel from "../models/foodModels.js"
import fs from "fs"


const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    try {
        await foodModel.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: image_filename
        })

        res.json({
            status: "success",
            message: "Food added"
        });
    }
    catch (err) {
        res.json({
            status: "fail",
            message: err.message
        })
    }
}

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({
            status: "success",
            data: foods
        })
    }
    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({
            status: "success",
            message: "Deletion successful"
        })
    }
    catch (err) {
        res.json({
            status: "fail",
            message: "Deletion failed"
        })
    }
}

export { addFood, listFood, removeFood }