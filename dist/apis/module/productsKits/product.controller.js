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
exports.updateProductName = exports.getProduct = exports.createProduct = void 0;
const productKit_service_1 = require("./productKit.service");
const product_model_1 = __importDefault(require("../products/product.model"));
// ==================== create user ======================
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { name, product_ids } = data;
        if (!name || !product_ids.length) {
            return res
                .status(400)
                .json({ error: "name and product_ids ate required" });
        }
        const products = yield product_model_1.default.find({ _id: { $in: product_ids } });
        let product_names = [];
        let price = 0;
        products.map((item) => {
            product_names.push(item === null || item === void 0 ? void 0 : item.name);
            price = price + item.price;
        });
        const result = yield (0, productKit_service_1.createProductToDB)(Object.assign(Object.assign({}, data), { price,
            product_names }));
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
    const result = yield (0, productKit_service_1.getProductFromDB)();
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
        const Product = (0, productKit_service_1.updateProductInDB)(id, data);
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
