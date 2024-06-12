
import mongoose, { Schema, model, Model } from "mongoose";
import { ILead } from "./lead.interface";




const LeadSchema = new Schema<ILead>({
    type: { type: String, enum: ['general', 'partners'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true }
});


// Define mongoose model
const Lead: Model<ILead> = mongoose.model("Faq", LeadSchema);

export default Lead;
