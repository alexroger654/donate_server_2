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
exports.updateProductName = exports.getProduct = exports.createProduct = void 0;
const product_service_1 = require("./product.service");
// ==================== create user ======================
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("rere");
        const data = req.body;
        const { name, description, image_url, price } = data;
        if (!name || !price) {
            return res.status(400).json({ error: "price , name are required" });
        }
        if (typeof price !== "number") {
            return res.status(400).json({ error: "price has to be a number" });
        }
        const result = yield (0, product_service_1.createProductToDB)(data);
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
exports.createProduct = createProduct;
// ==================== get users ======================
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, product_service_1.getProductFromDB)();
    res.status(200).json({
        status: "success",
        data: result,
    });
});
exports.getProduct = getProduct;
// ==================== update Products ======================
const updateProductName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const { name, description, image_url, price } = data;
        if (!id) {
            return res.status(400).json({ error: "Product ID is required" });
        }
        // update Product =============================
        const Product = (0, product_service_1.updateProductInDB)(id, data);
        if (!Product) {
            return res.status(404).json({ error: "Product not found" });
        }
        // Sending a success response
        res.status(200).json({
            data: Product,
            message: "Product updated successfully",
        });
    }
    catch (error) {
        // Handling errors
        console.error("Error updating Product name:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateProductName = updateProductName;
// // ==================== update Products ======================
// const updateProductName = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, color } = req.body;
//     // Check if Product id and name are provided
//     if (!id || !name) {
//       return res
//         .status(400)
//         .json({ error: "Product ID param and name are required" });
//     }
//     // Check if the name is already taken ===============
//     const existingProduct = await getProductsFromDB(name);
//     if (existingProduct && existingProduct.length !== 0) {
//       return res.status(400).json({ error: "Product name already exists" });
//     }
//     // update Product =============================
//     const Product = updateProductNameInDB(id, name, color);
//     if (!Product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     // Sending a success response
//     res.status(200).json({
//       data: Product,
//       message: "Product name updated successfully",
//     });
//   } catch (error) {
//     // Handling errors
//     console.error("Error updating Product name:", error.message);
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
