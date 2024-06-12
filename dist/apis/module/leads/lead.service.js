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
exports.updateLeadInDB = exports.getLeadFromDB = exports.createLeadToDB = void 0;
const lead_model_1 = __importDefault(require("./lead.model"));
const createLeadToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user
    const result = new lead_model_1.default(payload);
    yield result.save();
    return result;
});
exports.createLeadToDB = createLeadToDB;
const getLeadFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lead_model_1.default.find();
    return result;
});
exports.getLeadFromDB = getLeadFromDB;
const updateLeadInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield lead_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedTask;
});
exports.updateLeadInDB = updateLeadInDB;
