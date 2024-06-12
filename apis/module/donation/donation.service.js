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
exports.getDonationFromDB = exports.createDonationToDB = void 0;
const donation_model_1 = __importDefault(require("./donation.model"));
const createDonationToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user
    const result = new donation_model_1.default(payload);
    yield result.save();
    return result;
});
exports.createDonationToDB = createDonationToDB;
const getDonationFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_model_1.default.find();
    return result;
});
exports.getDonationFromDB = getDonationFromDB;
