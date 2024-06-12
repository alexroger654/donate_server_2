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
exports.updateLeadName = exports.getLead = exports.createLead = void 0;
const lead_service_1 = require("./lead.service");
// ==================== create user ======================
const createLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { name, message, phone, email, type } = data;
        if (!type) {
            return res.status(400).json({ error: "type is required" });
        }
        if (!email || !name || !phone) {
            return res
                .status(400)
                .json({ error: "email , name and phone are required" });
        }
        const result = yield (0, lead_service_1.createLeadToDB)(data);
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
exports.createLead = createLead;
// ==================== get users ======================
const getLead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, lead_service_1.getLeadFromDB)();
    res.status(200).json({
        status: "success",
        data: result,
    });
});
exports.getLead = getLead;
// ==================== update Leads ======================
const updateLeadName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const { name, message, phone, email, type } = data;
        if (!id) {
            return res.status(400).json({ error: "lead ID is required" });
        }
        // update Lead =============================
        const Lead = (0, lead_service_1.updateLeadInDB)(id, { name, message, phone, email, type });
        if (!Lead) {
            return res.status(404).json({ error: "Lead not found" });
        }
        // Sending a success response
        res.status(200).json({
            data: Lead,
            message: "Lead updated successfully",
        });
    }
    catch (error) {
        // Handling errors
        console.error("Error updating Lead name:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateLeadName = updateLeadName;
// // ==================== update Leads ======================
// const updateLeadName = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, color } = req.body;
//     // Check if Lead id and name are provided
//     if (!id || !name) {
//       return res
//         .status(400)
//         .json({ error: "Lead ID param and name are required" });
//     }
//     // Check if the name is already taken ===============
//     const existingLead = await getLeadsFromDB(name);
//     if (existingLead && existingLead.length !== 0) {
//       return res.status(400).json({ error: "Lead name already exists" });
//     }
//     // update Lead =============================
//     const Lead = updateLeadNameInDB(id, name, color);
//     if (!Lead) {
//       return res.status(404).json({ error: "Lead not found" });
//     }
//     // Sending a success response
//     res.status(200).json({
//       data: Lead,
//       message: "Lead name updated successfully",
//     });
//   } catch (error) {
//     // Handling errors
//     console.error("Error updating Lead name:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
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
