"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPasswordInDB = exports.getAllUsersFromDBByCompanyEmail = exports.getUserByEmailFromDB = exports.getUserByIdFromDB = exports.getUsersFromDB = exports.createUserToDB = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserToDB = async (payload) => {
    // creating a new user
    const user = new user_model_1.default(payload);
    await user.save();
    return user;
};
exports.createUserToDB = createUserToDB;
const getUsersFromDB = async () => {
    const users = await user_model_1.default.find();
    return users;
};
exports.getUsersFromDB = getUsersFromDB;
const getUserByIdFromDB = async (payload) => {
    try {
        const user = await user_model_1.default.findById(payload);
        return user;
    }
    catch (error) {
        console.error("Error finding user by ID:", error);
        return null;
    }
};
exports.getUserByIdFromDB = getUserByIdFromDB;
const getUserByEmailFromDB = async (email) => {
    const user = await user_model_1.default.findOne({ email: email });
    return user;
};
exports.getUserByEmailFromDB = getUserByEmailFromDB;
const getAllUsersFromDBByCompanyEmail = async (companyEmail) => {
    console.log("companyEmail", companyEmail);
    const users = await user_model_1.default.find({ companyEmail: companyEmail });
    return users;
};
exports.getAllUsersFromDBByCompanyEmail = getAllUsersFromDBByCompanyEmail;
const updateUserPasswordInDB = async (email, payload) => {
    const updatedUser = await user_model_1.default.findOneAndUpdate({ email }, payload, { new: true });
    return updatedUser;
};
exports.updateUserPasswordInDB = updateUserPasswordInDB;
// export const getAdminUsersFromDB = async () => {
//   const admins = await User.getAdminUsers();
//   console.log(admins);
//   return admins;
// };
//Class -> Attach -> Method -> Directly call using Class
// user = new User
// user.   instance methods
// User.getAdminUsers()
