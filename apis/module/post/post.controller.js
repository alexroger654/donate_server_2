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
exports.deleteItem = exports.updatePost = exports.getPost = exports.createPost = void 0;
const post_service_1 = require("./post.service");
// ==================== create  ======================
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, post_service_1.createPostToDB)(data);
        res.status(200).json({
            status: "success",
            data: result,
            message: "Post created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `Post creation failed ${err}`,
        });
    }
});
exports.createPost = createPost;
// ==================== get all ======================
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, sort, id, page, limit, date, type } = req.query;
        console.log(req, "ppp");
        // Setting default values for page and limit
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        // Calculate skip value for pagination
        const skip = (pageNumber - 1) * pageSize;
        // Getting data
        const result = yield (0, post_service_1.getPostFromDB)(name, sort, id, skip, limit, date, type);
        // Check if Posts exist
        if (!result || result.length === 0) {
            // Sending response ============
            return res.status(404).json({
                message: "No Posts found",
                data: [],
            });
        }
        res.status(200).json({
            status: "success",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `Failed to fetch Posts: ${err}`,
        });
    }
});
exports.getPost = getPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const updatedReimbursement = yield (0, post_service_1.updatePostInDB)(id, data);
    res.status(200).json({
        status: "success",
        data: updatedReimbursement,
    });
});
exports.updatePost = updatePost;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, post_service_1.deleteFromDb)(id);
        if (!result) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json({ data: result, message: "deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting Folder:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteItem = deleteItem;
