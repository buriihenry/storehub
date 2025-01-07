import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); // This will allow us to parse JSON data.(middleware)fucntion that runs before the actual route.

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

app.listen(3000, () => {
    connectDB();
    console.log("Server started on http://localhost:3000");
});
