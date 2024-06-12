import mongoose, { Schema, model, Model } from "mongoose";
import { IDonation } from "./donation.interface";

const DonationSchema = new Schema<IDonation>({
  type: {
    type: String,
    enum: ["monthly_payment", "donation", "gift_cards"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer"],
    required: true,
  },
  description: {
    type: String,
  },
});

// Define mongoose model
const Donation: Model<IDonation> = mongoose.model("Donation", DonationSchema);

export default Donation;
