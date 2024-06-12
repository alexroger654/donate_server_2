import mongoose, { Schema, model, Model } from "mongoose";
import { ITransaction } from "./transaction.interface";

const TransactionSchema = new Schema<ITransaction>({
  user_Id: { type: String, required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  transaction_type: {
    type: String,
    enum: ["one_time", "monthly"],
    required: true,
  },
  status: { type: String, enum: ["completed", "pending"], required: true },
  product_name: { type: String, required: true },
  product_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

// Define mongoose model
const Transaction: Model<ITransaction> = mongoose.model(
  "Transaction",
  TransactionSchema
);

export default Transaction;
