import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { createDonationToDB, getDonationFromDB } from "./donation.service";

// ==================== create user ======================
export const createDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    // const { type } = data;

    // if (!type) {
    //   return res.status(404).json({ error: "type is required" });
    // }

    const result = await createDonationToDB(data);

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
export const getDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getDonationFromDB();

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
