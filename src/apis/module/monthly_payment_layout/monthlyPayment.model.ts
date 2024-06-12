
import mongoose, { Schema, model, Model } from "mongoose";
import { IMonthlyPayment } from "./monthlyPayment.interface";



const MonthlyPaymentSchema = new Schema<IMonthlyPayment>({
   category_name: {
        type: String,
        required: true
    },
    campaign_name: {
        type: String,
        required: true
    },
    campaign_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    // payment_method: {
    //     type: String,
    //     required: true
    // },
    payment_account_number: {
        type: String,
        required: true
    }

});


// Define mongoose model
const MonthlyPayment: Model<IMonthlyPayment> = mongoose.model("Faq", MonthlyPaymentSchema);

export default MonthlyPayment;
