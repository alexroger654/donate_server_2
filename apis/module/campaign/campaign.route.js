"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campaign_controller_1 = require("./campaign.controller");
const router = express_1.default.Router();
router.get("/list", campaign_controller_1.getCampaign);
router.post("/create", campaign_controller_1.createCampaign);
router.patch("/update/:id", campaign_controller_1.updateCampaignName);
exports.default = router;
