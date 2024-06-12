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
exports.getTransactionFromDB = exports.createTransactionToDB = void 0;
const transaction_model_1 = __importDefault(require("./transaction.model"));
const createTransactionToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user
    const result = new transaction_model_1.default(payload);
    yield result.save();
    return result;
});
exports.createTransactionToDB = createTransactionToDB;
const getTransactionFromDB = (name, product_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (name) {
        query.user_name = name;
    }
    if (product_id) {
        query.product_id = product_id;
    }
    if (user_id) {
        query.user_id = user_id;
    }
    let sort = { created_at: 1 };
    console.log(query, "-----------------------");
    const result = yield transaction_model_1.default.find(query).sort(sort);
    // const result = await Transaction.find();
    return result;
});
exports.getTransactionFromDB = getTransactionFromDB;
