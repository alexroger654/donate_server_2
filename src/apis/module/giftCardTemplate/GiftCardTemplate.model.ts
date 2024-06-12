import mongoose, { Schema, model, Model } from "mongoose";
import { IGiftCardTemplate } from "./GiftCardTemplate.interface";

const GiftCardTemplateSchema = new Schema<IGiftCardTemplate>({
  gift_card_name: {
    type: String,
  },
  gift_card_id: {
    type: String,
    unique: true,
  },
  gift_card_amount: {
    type: String,
  },
  image_url: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define mongoose model
const GiftCardTemplate: Model<IGiftCardTemplate> = mongoose.model(
  "GiftCardTemplate",
  GiftCardTemplateSchema
);

export default GiftCardTemplate;
