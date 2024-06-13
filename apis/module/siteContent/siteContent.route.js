"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const siteContent_controller_1 = require("./siteContent.controller");
const router = express_1.default.Router();
router.post("/create", siteContent_controller_1.createsiteContent);
router.patch("/update/:id", siteContent_controller_1.updatesiteContent);
router.get("/list", siteContent_controller_1.getsiteContent);
router.delete("/delete/:id", siteContent_controller_1.deleteItem);
exports.default = router;
