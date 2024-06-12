import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createProductToDB,
  getProductFromDB,
  updateProductInDB,
} from "./productKit.service";
import Product from "../products/product.model";

// ==================== create user ======================
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { name, product_ids } = data;

    if (!name || !product_ids.length) {
      return res
        .status(400)
        .json({ error: "name and product_ids ate required" });
    }

    const products = await Product.find({ _id: { $in: product_ids } });

    let product_names: any = [];
    let price = 0;

    products.map((item) => {
      product_names.push(item?.name);
      price = price + item.price;
    });

    const result = await createProductToDB({
      ...data,
      price,
      product_names,
    });

    res.status(200).json({
      status: "success",
      data: result,
      message: " created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: ` creation failed ${err}`,
    });
  }
};

// ==================== get users ======================
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getProductFromDB();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// ==================== update Products ======================
export const updateProductName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { name, description, image_url, price } = data;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // update Product =============================
    const Product = updateProductInDB(id, data);

    if (!Product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Sending a success response
    res.status(200).json({
      data: Product,
      message: "Product updated successfully",
    });
  } catch (error: any) {
    // Handling errors
    console.error("Error updating Product name:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
