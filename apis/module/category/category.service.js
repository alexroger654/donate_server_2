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
exports.deleteFromDb = exports.updateCategoryInDB = exports.getCategoryFromDB = exports.createCategoryToDB = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const createCategoryToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user
    const result = new category_model_1.default(payload);
    yield result.save();
    return result;
});
exports.createCategoryToDB = createCategoryToDB;
const getCategoryFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.default.find();
    return result;
});
exports.getCategoryFromDB = getCategoryFromDB;
const updateCategoryInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield category_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return updatedTask;
});
exports.updateCategoryInDB = updateCategoryInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAppointment = yield category_model_1.default.findByIdAndDelete(id);
        return deletedAppointment;
    }
    catch (error) {
        console.error("Error deleting Appointment:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
// export const getAdminUsersFromDB = async () => {
//   const admins = await User.getAdminUsers();
//   console.log(admins);
//   return admins;
// };
//Class -> Attach -> Method -> Directly call using Class
// user = new User
// user.   instance methods
// User.getAdminUsers()
