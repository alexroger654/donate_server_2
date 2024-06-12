import mongoose, { Schema, model, Model } from "mongoose";
import { ICampaign } from "./campaign.interface";

const CampaignSchema = new Schema<ICampaign>({
  user_name: String,
  user_email: String,
  user_phone_number: String,
  user_id: String,
  campaign_name: String,
  campaign_description: String,
  beneficiary_party_type: { type: String, enum: ["individual", "ngo"] },
  beneficiary_party_name: String,
  image_url: String,
  category_name: String,
  targeted_amount: Number,
  raised_amount: { type: Number, default: 0 },
  location: String,
  start_date: Date,
  end_date: Date,
  product_ids: [String],
  product_kit_ids: [String],
  documents: [String],
  isVerified: Boolean,
  created_at: { type: Date, default: Date.now },
  rejectMessage: String,
  status: { type: String, enum: ["pending", "active", "rejected", "onHold"] },
  products: [
    {
      product_id: String,
      product_name: String,
      product_description: String,
      product_price: Number,
      product_quantity: Number,
      product_image_url: String,
    },
  ],
  productKits: [
    {
      name: String,
      products: [
        {
          product_id: String,
          product_name: String,
          product_description: String,
          product_price: Number,
          product_quantity: Number,
          product_image_url: String,
        },
      ],
    },
  ],
});
// Define mongoose model
const Campaign: Model<ICampaign> = mongoose.model("Campaign", CampaignSchema);

export default Campaign;
