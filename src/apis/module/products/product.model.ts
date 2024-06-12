import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  price: { type: Number, required: true },
});

// Define mongoose model
const Product: Model<IProduct> = mongoose.model("Product", ProductSchema);

export default Product;
