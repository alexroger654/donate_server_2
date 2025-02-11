"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
/*
   /
   /admins
   /:id   dynamic
*/
router.get("/list", user_controller_1.getUsers);
router.get("/list", user_controller_1.getUsers);
router.post("/create", user_controller_1.createUser);
router.post("/login", user_controller_1.handleUserLogin);
router.post("/forgot-password", user_controller_1.forgotPassword);
router.post("/reset-password", user_controller_1.resetPassword);
exports.default = router;
