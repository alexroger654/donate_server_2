import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createCategoryToDB,
  deleteFromDb,
  getCategoryFromDB,
  updateCategoryInDB,
} from "./category.service";

// ==================== create user ======================
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { name } = data;
    const slug = name.toLowerCase().replace(/ /g, "-");

    const result = await createCategoryToDB({ ...data, slug });

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
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getCategoryFromDB();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// ==================== update Leads ======================
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ error: "lead ID is required" });
    }

    // update Lead =============================
    const result = updateCategoryInDB(id, data);

    if (!result) {
      return res.status(404).json({ error: "Lead not found" });
    }

    // Sending a success response
    res.status(200).json({
      data: result,
      message: "updated successfully",
    });
  } catch (error: any) {
    // Handling errors
    console.error("Error updating Lead name:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await deleteFromDb(id);

    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ data: result, message: "deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting Folder:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
