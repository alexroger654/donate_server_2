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
exports.updateGiftCardName = exports.getGiftCard = exports.createGiftCard = void 0;
const giftcard_service_1 = require("./giftcard.service");
// ==================== create user ======================
const createGiftCard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // const { name, message, phone, email, type } = data;
        // if (!type) {
        //   return res.status(400).json({ error: "type is required" });
        // }
        // if (!email || !name || !phone) {
        //   return res
        //     .status(400)
        //     .json({ error: "email , name and phone are required" });
        // }
        const result = yield (0, giftcard_service_1.createGiftCardToDB)(data);
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
exports.createGiftCard = createGiftCard;
// ==================== get users ======================
const getGiftCard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, giftcard_service_1.getGiftCardFromDB)();
    res.status(200).json({
        status: "success",
        data: result,
    });
});
exports.getGiftCard = getGiftCard;
// ==================== update GiftCards ======================
const updateGiftCardName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id) {
            return res.status(400).json({ error: "GiftCard ID is required" });
        }
        // update GiftCard =============================
        const GiftCard = (0, giftcard_service_1.updateGiftCardInDB)(id, data);
        if (!GiftCard) {
            return res.status(404).json({ error: "GiftCard not found" });
        }
        // Sending a success response
        res.status(200).json({
            data: GiftCard,
            message: "GiftCard updated successfully",
        });
    }
    catch (error) {
        // Handling errors
        console.error("Error updating GiftCard name:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateGiftCardName = updateGiftCardName;
// // ==================== update GiftCards ======================
// const updateGiftCardName = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, color } = req.body;
//     // Check if GiftCard id and name are provided
//     if (!id || !name) {
//       return res
//         .status(400)
//         .json({ error: "GiftCard ID param and name are required" });
//     }
//     // Check if the name is already taken ===============
//     const existingGiftCard = await getGiftCardsFromDB(name);
//     if (existingGiftCard && existingGiftCard.length !== 0) {
//       return res.status(400).json({ error: "GiftCard name already exists" });
//     }
//     // update GiftCard =============================
//     const GiftCard = updateGiftCardNameInDB(id, name, color);
//     if (!GiftCard) {
//       return res.status(404).json({ error: "GiftCard not found" });
//     }
//     // Sending a success response
//     res.status(200).json({
//       data: GiftCard,
//       message: "GiftCard name updated successfully",
//     });
//   } catch (error) {
//     // Handling errors
//     console.error("Error updating GiftCard name:", error.message);
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
