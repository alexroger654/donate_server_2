"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CampaignSchema = new mongoose_1.Schema({
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
    category_Id: String,
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
const Campaign = mongoose_1.default.model("Campaign", CampaignSchema);
exports.default = Campaign;
