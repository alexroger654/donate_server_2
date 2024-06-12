import mongoose, { Schema, model, Model } from "mongoose";
import { IGiftCard } from "./giftcard.interface";

const GiftCardSchema = new Schema<IGiftCard>({
  gift_card_name: {
    type: String,
    required: true,
  },
  gift_card_id: {
    type: String,
    required: true,
    unique: true,
  },
  gift_card_amount: {
    type: String,
    required: true,
  },
  sender_name: {
    type: String,
    required: true,
  },
  sender_email: {
    type: String,
    required: true,
  },
  receiver_name: {
    type: String,
    required: true,
  },
  receiver_email: {
    type: String,
    required: true,
  },
});

// Define mongoose model
const GiftCard: Model<IGiftCard> = mongoose.model("GiftCard", GiftCardSchema);

export default GiftCard;
