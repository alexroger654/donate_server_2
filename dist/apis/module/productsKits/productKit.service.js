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
exports.updateProductInDB = exports.getProductFromDB = exports.createProductToDB = void 0;
const productKit_model_1 = __importDefault(require("./productKit.model"));
const createProductToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user
    const result = new productKit_model_1.default(payload);
    yield result.save();
    return result;
});
exports.createProductToDB = createProductToDB;
const getProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productKit_model_1.default.find();
    return result;
});
exports.getProductFromDB = getProductFromDB;
const updateProductInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield productKit_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedTask;
});
exports.updateProductInDB = updateProductInDB;
