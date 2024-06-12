import mongoose, { Schema, model, Model } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image_url: {
    type: String,
  },
  slug: {
    type: String,
  },
});

// Define mongoose model
const Category: Model<ICategory> = mongoose.model("Category", CategorySchema);

export default Category;
