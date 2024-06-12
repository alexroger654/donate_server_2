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
exports.handleUserLogin = exports.getAllEmployeeByCompanyEmail = exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("./user.service");
// ==================== create user ======================
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { email, password, role } = data;
        // ============== check if email, password and role are provided ===============
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email, password are required",
            });
        }
        // ============== check if user already exists===============
        const isExists = yield (0, user_service_1.getUserByEmailFromDB)(email);
        if (isExists) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            });
        }
        // ============== hash password ===============
        let hashedPassword;
        if (password) {
            hashedPassword = yield bcrypt_1.default.hash(password, 15);
        }
        const user = yield (0, user_service_1.createUserToDB)(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        res.status(200).json({
            status: "success",
            data: user === null || user === void 0 ? void 0 : user.email,
            message: "User created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `User creation failed ${err}`,
        });
    }
});
exports.createUser = createUser;
// ==================== get users ======================
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.getUsersFromDB)();
    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.getUsers = getUsers;
// ==================== get user by id ======================
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield (0, user_service_1.getUserByIdFromDB)(id);
    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.getUserById = getUserById;
// ==================== get user by email ======================
const getUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const user = yield (0, user_service_1.getUserByEmailFromDB)(email);
    console.log("hitted from getUserById", email);
    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.getUserByEmail = getUserByEmail;
const getAllEmployeeByCompanyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_email } = req.params;
    console.log("companyEmail", company_email);
    const user = yield (0, user_service_1.getAllUsersFromDBByCompanyEmail)(company_email);
    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.getAllEmployeeByCompanyEmail = getAllEmployeeByCompanyEmail;
// ==================== login ======================
const handleUserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { email, password } = data;
    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Email and password are required",
        });
    }
    const user = yield (0, user_service_1.getUserByEmailFromDB)(email);
    if (!user) {
        return res.status(400).json({
            status: "error",
            message: "User not found",
        });
    }
    console.log(user);
    if (user) {
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        console.log("isMatch", isMatch);
        if (!isMatch) {
            return res.status(400).json({
                status: "error",
                message: "Password is incorrect",
            });
        }
        else {
            return res.status(200).json({
                status: "success",
                data: user,
            });
        }
    }
});
exports.handleUserLogin = handleUserLogin;
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
