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
exports.updateCampaignInDB = exports.getCampaignFromDB = exports.createCampaignToDB = void 0;
const campaign_model_1 = __importDefault(require("./campaign.model"));
const createCampaignToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user
    const result = new campaign_model_1.default(payload);
    yield result.save();
    return result;
});
exports.createCampaignToDB = createCampaignToDB;
const getCampaignFromDB = (nameQuery, sortQuery, idQuery, user, status, category) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    // If name is provided, filter by name
    if (nameQuery) {
        query.campaign_name = { $regex: nameQuery, $options: "i" };
    }
    if (category) {
        query.category_name = category;
    }
    if (status) {
        console.log(status);
        query.status = status;
    }
    if (user) {
        query.user_id = user;
    }
    if (idQuery) {
        query._id = idQuery;
    }
    console.log(query, "pppppppppp");
    // // Sorting based on sortQuery
    let sort = { created_at: 1 }; // Default
    if (sortQuery && sortQuery.toLowerCase() === "desc") {
        sort = { created_at: -1 }; // descending order
    }
    const result = yield campaign_model_1.default.find(query).sort(sort);
    // const result = await Campaign.find({});
    console.log(result, "ooo");
    return result;
});
exports.getCampaignFromDB = getCampaignFromDB;
const updateCampaignInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield campaign_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedTask;
});
exports.updateCampaignInDB = updateCampaignInDB;
