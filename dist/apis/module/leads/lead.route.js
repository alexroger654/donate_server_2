"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lead_controller_1 = require("./lead.controller");
const router = express_1.default.Router();
router.get("/list", lead_controller_1.getLead);
router.post("/create", lead_controller_1.createLead);
router.patch('/update/:id', lead_controller_1.updateLeadName);
exports.default = router;
