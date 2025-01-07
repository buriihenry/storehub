import mongoose from "mongoose";

// This is a schema. It is a blueprint for the data.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
},{
    timestamps: true, // This will add a timestamp to the document.
}
); 
const Product = mongoose.model("Product", productSchema);

export default Product; // This will export the Product model.