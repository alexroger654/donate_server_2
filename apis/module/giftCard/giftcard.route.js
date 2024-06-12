"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const giftcard_controller_1 = require("./giftcard.controller");
const router = express_1.default.Router();
router.get("/list", giftcard_controller_1.getGiftCard);
router.post("/create", giftcard_controller_1.createGiftCard);
router.patch("/update/:id", giftcard_controller_1.updateGiftCardName);
exports.default = router;
