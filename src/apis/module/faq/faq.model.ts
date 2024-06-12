import mongoose, { Schema, model, Model } from "mongoose";
import { IFaq } from "./faq.interface";

const FaqSchema = new Schema<IFaq>({
  type: {
    type: String,
    enum: ["monthly_payment", "donation", "company", "partners", "gift_cards"],
    required: true,
  },
  qus: { type: String, required: true },
  ans: { type: String, required: true },
});

// Define mongoose model
const Faq: Model<IFaq> = mongoose.model("Faq", FaqSchema);

export default Faq;
