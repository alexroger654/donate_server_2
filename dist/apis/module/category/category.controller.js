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
exports.deleteItem = exports.updateCategory = exports.getCategory = exports.createCategory = void 0;
const category_service_1 = require("./category.service");
// ==================== create user ======================
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { name } = data;
        const slug = name.toLowerCase().replace(/ /g, "-");
        const result = yield (0, category_service_1.createCategoryToDB)(Object.assign(Object.assign({}, data), { slug }));
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
exports.createCategory = createCategory;
// ==================== get users ======================
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, category_service_1.getCategoryFromDB)();
    res.status(200).json({
        status: "success",
        data: result,
    });
});
exports.getCategory = getCategory;
// ==================== update Leads ======================
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id) {
            return res.status(400).json({ error: "lead ID is required" });
        }
        // update Lead =============================
        const result = (0, category_service_1.updateCategoryInDB)(id, data);
        if (!result) {
            return res.status(404).json({ error: "Lead not found" });
        }
        // Sending a success response
        res.status(200).json({
            data: result,
            message: "updated successfully",
        });
    }
    catch (error) {
        // Handling errors
        console.error("Error updating Lead name:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateCategory = updateCategory;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, category_service_1.deleteFromDb)(id);
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
// export const getAdminUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const user = await getAdminUsersFromDB();
//   console.log("hitted from getAdminUsers");
//   res.status(200).json({
//     status: "success",
//     data: user,
//   });
// };
