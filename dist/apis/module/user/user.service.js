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
exports.getAllUsersFromDBByCompanyEmail = exports.getUserByEmailFromDB = exports.getUserByIdFromDB = exports.getUsersFromDB = exports.createUserToDB = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user
    const user = new user_model_1.default(payload);
    yield user.save();
    return user;
});
exports.createUserToDB = createUserToDB;
const getUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    return users;
});
exports.getUsersFromDB = getUsersFromDB;
const getUserByIdFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(payload);
        return user;
    }
    catch (error) {
        console.error("Error finding user by ID:", error);
        return null;
    }
});
exports.getUserByIdFromDB = getUserByIdFromDB;
const getUserByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email });
    return user;
});
exports.getUserByEmailFromDB = getUserByEmailFromDB;
const getAllUsersFromDBByCompanyEmail = (companyEmail) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("companyEmail", companyEmail);
    const users = yield user_model_1.default.find({ companyEmail: companyEmail });
    return users;
});
exports.getAllUsersFromDBByCompanyEmail = getAllUsersFromDBByCompanyEmail;
// export const getAdminUsersFromDB = async () => {
//   const admins = await User.getAdminUsers();
//   console.log(admins);
//   return admins;
// };
//Class -> Attach -> Method -> Directly call using Class
// user = new User
// user.   instance methods
// User.getAdminUsers()
