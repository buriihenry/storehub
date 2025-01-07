import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); // This will allow us to parse JSON data.(middleware)fucntion that runs before the actual route.

app.use("/api/products", productRoutes);

app.listen(3000, () => {
    connectDB();
    console.log("Server started on http://localhost:3000");
});
