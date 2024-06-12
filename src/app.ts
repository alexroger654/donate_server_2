import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
//============ api routes ====================
import userRoutes from "./apis/module/user/user.route";
import categoryRoutes from "./apis/module/category/category.route";
import faqRoutes from "./apis/module/faq/faq.route";
import productsRoutes from "./apis/module/products/product.route";
import productsKitsRoutes from "./apis/module/productsKits/productKit.route";
import campaignsRoutes from "./apis/module/campaign/campaign.route";
import giftCardRoutes from "./apis/module/giftCard/giftcard.route";
import transactionRoutes from "./apis/module/transactions/transaction.route";
import giftCardTemplateRoutes from "./apis/module/giftCardTemplate/GiftCardTemplate.route";

dotenv.config();
const app: Application = express();

//middle ware
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Increase the size limit for JSON payloads
app.use(bodyParser.json({ limit: "50mb" }));

// Increase the size limit for URL-encoded form payloads
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/faq", faqRoutes);
app.use("/api/v1/product", productsRoutes);
app.use("/api/v1/product_kit", productsKitsRoutes);
app.use("/api/v1/campaign", campaignsRoutes);
app.use("/api/v1/gift_card", giftCardRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/gift_card_template", giftCardTemplateRoutes);

export default app;
