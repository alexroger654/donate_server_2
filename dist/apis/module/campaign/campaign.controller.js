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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCampaignName = exports.getCampaign = exports.createCampaign = void 0;
const campaign_service_1 = require("./campaign.service");
// ==================== create user ======================
const createCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { campaign_name, targeted_amount, category_name, start_date, end_date, documents, } = data;
        if (!category_name) {
            return res.status(400).json({ error: "category_name is required" });
        }
        if (!campaign_name ||
            !targeted_amount ||
            // !documents ||
            !end_date ||
            !start_date) {
            return res.status(400).json({
                error: "start date , end date, documents, targeted amount and name  are required",
            });
        }
        const result = yield (0, campaign_service_1.createCampaignToDB)(data);
        res.status(200).json({
            status: "success",
            data: result,
            message: " created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: ` creation failed ${err}`,
        });
    }
});
exports.createCampaign = createCampaign;
// ==================== get users ======================
const getCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // query parameters ============
    const { name, sort, id, user, category, status } = req.query;
    console.log(status, "pppp");
    const result = yield (0, campaign_service_1.getCampaignFromDB)(name, sort, id, user, status, category);
    res.status(200).json({
        status: "success",
        data: result,
    });
});
exports.getCampaign = getCampaign;
// ==================== get users ======================
// ==================== update Campaigns ======================
const updateCampaignName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id) {
            return res.status(400).json({ error: "Campaign ID is required" });
        }
        // update Campaign =============================
        const Campaign = (0, campaign_service_1.updateCampaignInDB)(id, data);
        if (!Campaign) {
            return res.status(404).json({ error: "Campaign not found" });
        }
        // Sending a success response
        res.status(200).json({
            data: Campaign,
            message: "Campaign updated successfully",
        });
    }
    catch (error) {
        // Handling errors
        console.error("Error updating Campaign name:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateCampaignName = updateCampaignName;
