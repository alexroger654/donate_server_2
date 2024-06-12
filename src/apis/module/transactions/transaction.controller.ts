import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createTransactionToDB,
  getTransactionFromDB,
} from "./transaction.service";

// ==================== create user ======================
export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const result = await createTransactionToDB(data);

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
export const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, product_id, user_id } = req.query;
  const result = await getTransactionFromDB(name, product_id, user_id);

  res.status(200).json({
    status: "success",
    data: result,
  });
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
