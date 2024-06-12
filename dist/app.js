"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
//============ api routes ====================
const user_route_1 = __importDefault(require("./apis/module/user/user.route"));
const category_route_1 = __importDefault(require("./apis/module/category/category.route"));
const faq_route_1 = __importDefault(require("./apis/module/faq/faq.route"));
const product_route_1 = __importDefault(require("./apis/module/products/product.route"));
const productKit_route_1 = __importDefault(require("./apis/module/productsKits/productKit.route"));
const campaign_route_1 = __importDefault(require("./apis/module/campaign/campaign.route"));
const giftcard_route_1 = __importDefault(require("./apis/module/giftCard/giftcard.route"));
const transaction_route_1 = __importDefault(require("./apis/module/transactions/transaction.route"));
const GiftCardTemplate_route_1 = __importDefault(require("./apis/module/giftCardTemplate/GiftCardTemplate.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//middle ware
app.use((0, cors_1.default)());
// app.use(express.json());
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Increase the size limit for JSON payloads
app.use(body_parser_1.default.json({ limit: "50mb" }));
// Increase the size limit for URL-encoded form payloads
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
//routes
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/category", category_route_1.default);
app.use("/api/v1/faq", faq_route_1.default);
app.use("/api/v1/product", product_route_1.default);
app.use("/api/v1/product_kit", productKit_route_1.default);
app.use("/api/v1/campaign", campaign_route_1.default);
app.use("/api/v1/gift_card", giftcard_route_1.default);
app.use("/api/v1/transaction", transaction_route_1.default);
app.use("/api/v1/gift_card_template", GiftCardTemplate_route_1.default);
exports.default = app;
