import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json()); // This will allow us to parse JSON data.(middleware)fucntion that runs before the actual route.

app.get("/api/products", async(req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    } catch (error) {
        console.log("error in fetching products:", error.message);
        
    }
})

app.post("/api/products", async (req,res) =>{
    const product =req.body; // this is the data that we are sending to the server

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"Name, price, and image are required."});
    }

    const newProduct = new Product(product)
    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});

    }catch (error) {
        console.error(" Error in create product: ", error.message);
        res.status(500).json({success:false, message:"Server error."});
    }
});

app.put("/api/products/:id", async(req, res)=>{
    const {id} =req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Product Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message:"Server Error"});
        
    }
})

app.delete("/api/products/:id", async(req,res) =>{
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product Deleted"});
    } catch (error) {
        console.log("error in deleting product:", error.message);
        res.status(404).json({success:false,message:"Product not found"});
        
    }
    
})

app.listen(3000, () => {
    connectDB();
    console.log("Server started on http://localhost:3000");
});
