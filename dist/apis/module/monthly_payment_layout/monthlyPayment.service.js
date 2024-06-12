"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyPaymentFromDB = exports.createMonthlyPaymentToDB = void 0;
const monthlyPayment_model_1 = __importDefault(require("./monthlyPayment.model"));
const createMonthlyPaymentToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user
    const result = new monthlyPayment_model_1.default(payload);
    yield result.save();
    return result;
});
exports.createMonthlyPaymentToDB = createMonthlyPaymentToDB;
const getMonthlyPaymentFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield monthlyPayment_model_1.default.find();
    return result;
});
exports.getMonthlyPaymentFromDB = getMonthlyPaymentFromDB;
