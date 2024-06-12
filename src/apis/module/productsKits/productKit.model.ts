import mongoose, { Schema, model, Model } from "mongoose";
import { IProductKit } from "./productKit.interface";

const ProductKitSchema = new Schema<IProductKit>({
  name: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  price: { type: Number },
  product_ids: {
    type: [String],
    default: [],
  },
  product_names: {
    type: [String],
    default: [],
  },
});

// Define mongoose model
const ProductKit: Model<IProductKit> = mongoose.model(
  "ProductKit",
  ProductKitSchema
);

export default ProductKit;
