"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.get("/list", product_controller_1.getProduct);
router.post("/create", product_controller_1.createProduct);
router.patch("/update/:id", product_controller_1.updateProductName);
exports.default = router;
