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
exports.updateGiftCardTemplateName = exports.getGiftCardTemplate = exports.createGiftCardTemplate = void 0;
const GiftCardTemplate_service_1 = require("./GiftCardTemplate.service");
// ==================== create user ======================
const createGiftCardTemplate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const gift_card_id = generateUniqueId();
        const result = yield (0, GiftCardTemplate_service_1.createGiftCardTemplateToDB)(Object.assign(Object.assign({}, data), { gift_card_id }));
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
exports.createGiftCardTemplate = createGiftCardTemplate;
// ==================== get users ======================
const getGiftCardTemplate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, GiftCardTemplate_service_1.getGiftCardTemplateFromDB)();
    res.status(200).json({
        status: "success",
        data: result,
    });
});
exports.getGiftCardTemplate = getGiftCardTemplate;
// ==================== update GiftCardTemplates ======================
const updateGiftCardTemplateName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id) {
            return res.status(400).json({ error: "GiftCardTemplate ID is required" });
        }
        // update GiftCardTemplate =============================
        const GiftCardTemplate = (0, GiftCardTemplate_service_1.updateGiftCardTemplateInDB)(id, data);
        if (!GiftCardTemplate) {
            return res.status(404).json({ error: "GiftCardTemplate not found" });
        }
        // Sending a success response
        res.status(200).json({
            data: GiftCardTemplate,
            message: "GiftCardTemplate updated successfully",
        });
    }
    catch (error) {
        // Handling errors
        console.error("Error updating GiftCardTemplate name:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateGiftCardTemplateName = updateGiftCardTemplateName;
// // ==================== update GiftCardTemplates ======================
// const updateGiftCardTemplateName = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, color } = req.body;
//     // Check if GiftCardTemplate id and name are provided
//     if (!id || !name) {
//       return res
//         .status(400)
//         .json({ error: "GiftCardTemplate ID param and name are required" });
//     }
//     // Check if the name is already taken ===============
//     const existingGiftCardTemplate = await getGiftCardTemplatesFromDB(name);
//     if (existingGiftCardTemplate && existingGiftCardTemplate.length !== 0) {
//       return res.status(400).json({ error: "GiftCardTemplate name already exists" });
//     }
//     // update GiftCardTemplate =============================
//     const GiftCardTemplate = updateGiftCardTemplateNameInDB(id, name, color);
//     if (!GiftCardTemplate) {
//       return res.status(404).json({ error: "GiftCardTemplate not found" });
//     }
//     // Sending a success response
//     res.status(200).json({
//       data: GiftCardTemplate,
//       message: "GiftCardTemplate name updated successfully",
//     });
//   } catch (error) {
//     // Handling errors
//     console.error("Error updating GiftCardTemplate name:", error.message);
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
function generateUniqueId() {
    let id = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return id;
}
