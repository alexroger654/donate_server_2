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
exports.getMonthlyPayment = exports.createMonthlyPayment = void 0;
const monthlyPayment_service_1 = require("./monthlyPayment.service");
// ==================== create user ======================
const createMonthlyPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { name, description } = data;
        const slug = name.toLowerCase().replace(/ /g, "-");
        const result = yield (0, monthlyPayment_service_1.createMonthlyPaymentToDB)(Object.assign(Object.assign({}, data), { slug }));
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
exports.createMonthlyPayment = createMonthlyPayment;
// ==================== get users ======================
const getMonthlyPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, monthlyPayment_service_1.getMonthlyPaymentFromDB)();
    res.status(200).json({
        status: "success",
        data: result,
    });
});
exports.getMonthlyPayment = getMonthlyPayment;
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
