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
exports.deleteSiteContentsByGroupNameFromDB = exports.deleteFromDb = exports.updateSiteContentInDB = exports.getAllSiteContentFromDB = exports.getSiteContentFromDB = exports.createSiteContentToDB = void 0;
const siteContent_model_1 = __importDefault(require("./siteContent.model"));
const createSiteContentToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new siteContent_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating SiteContent:", error);
        return null;
    }
});
exports.createSiteContentToDB = createSiteContentToDB;
const getSiteContentFromDB = (nameQuery, sortQuery, idQuery, skip, limit, date, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.userName = { $regex: nameQuery, $options: "i" };
        }
        if (type) {
            query.userType = type;
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (date) {
            query.createdAt = { $lte: new Date(date) };
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 };
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 };
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield siteContent_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield siteContent_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching SiteContents:", error);
        return [];
    }
});
exports.getSiteContentFromDB = getSiteContentFromDB;
const getAllSiteContentFromDB = (name, id, phone, eventId, eventSiteContentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (name) {
            query.firstName = { $regex: name, $options: "i" };
        }
        if (id) {
            query._id = id;
        }
        if (phone) {
            query.phone = phone;
        }
        if (eventId) {
            query.eventId = eventId;
        }
        if (eventSiteContentId) {
            query.eventSiteContentId = eventSiteContentId;
        }
        const result = yield siteContent_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching SiteContents from the database:", error);
        throw error;
    }
});
exports.getAllSiteContentFromDB = getAllSiteContentFromDB;
const updateSiteContentInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedSiteContent = yield siteContent_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedSiteContent;
    }
    catch (error) {
        console.error("Error updating SiteContent:", error);
        return null;
    }
});
exports.updateSiteContentInDB = updateSiteContentInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSiteContent = yield siteContent_model_1.default.findByIdAndDelete(id);
        return deletedSiteContent;
    }
    catch (error) {
        console.error("Error deleting SiteContent:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteSiteContentsByGroupNameFromDB = (SiteContentGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find SiteContents with the specified SiteContentGroupName
        const SiteContentsToDelete = yield siteContent_model_1.default.find({
            SiteContentGroupName,
        });
        // Delete each SiteContent one by one
        const deletionResults = yield Promise.all(SiteContentsToDelete.map((siteContent) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedSiteContent = yield siteContent_model_1.default.findByIdAndDelete(siteContent._id);
            return deletedSiteContent;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting SiteContents by group name:", error);
        return null;
    }
});
exports.deleteSiteContentsByGroupNameFromDB = deleteSiteContentsByGroupNameFromDB;
