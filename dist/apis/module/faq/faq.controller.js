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
exports.getFaq = exports.createFaq = void 0;
const faq_service_1 = require("./faq.service");
// ==================== create user ======================
const createFaq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { type } = data;
        if (!type) {
            return res.status(404).json({ error: "type is required" });
        }
        const result = yield (0, faq_service_1.createFaqToDB)(data);
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
exports.createFaq = createFaq;
// ==================== get users ======================
const getFaq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, faq_service_1.getFaqFromDB)();
    res.status(200).json({
        status: "success",
        data: result,
    });
});
exports.getFaq = getFaq;
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
