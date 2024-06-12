"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GiftCardTemplate_controller_1 = require("./GiftCardTemplate.controller");
const router = express_1.default.Router();
router.get("/list", GiftCardTemplate_controller_1.getGiftCardTemplate);
router.post("/create", GiftCardTemplate_controller_1.createGiftCardTemplate);
router.patch("/update/:id", GiftCardTemplate_controller_1.updateGiftCardTemplateName);
exports.default = router;
