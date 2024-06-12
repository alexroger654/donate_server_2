"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monthlyPayment_controller_1 = require("./monthlyPayment.controller");
const router = express_1.default.Router();
router.get("/list", monthlyPayment_controller_1.getMonthlyPayment);
router.post("/create", monthlyPayment_controller_1.createMonthlyPayment);
exports.default = router;
