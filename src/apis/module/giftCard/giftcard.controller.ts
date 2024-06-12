import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createGiftCardToDB,
  getGiftCardFromDB,
  updateGiftCardInDB,
} from "./giftcard.service";

// ==================== create user ======================
export const createGiftCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    // const { name, message, phone, email, type } = data;

    // if (!type) {
    //   return res.status(400).json({ error: "type is required" });
    // }

    // if (!email || !name || !phone) {
    //   return res
    //     .status(400)
    //     .json({ error: "email , name and phone are required" });
    // }

    const result = await createGiftCardToDB(data);

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
export const getGiftCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getGiftCardFromDB();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// ==================== update GiftCards ======================
export const updateGiftCardName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ error: "GiftCard ID is required" });
    }

    // update GiftCard =============================
    const GiftCard = updateGiftCardInDB(id, data);

    if (!GiftCard) {
      return res.status(404).json({ error: "GiftCard not found" });
    }

    // Sending a success response
    res.status(200).json({
      data: GiftCard,
      message: "GiftCard updated successfully",
    });
  } catch (error: any) {
    // Handling errors
    console.error("Error updating GiftCard name:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// // ==================== update GiftCards ======================
// const updateGiftCardName = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, color } = req.body;

//     // Check if GiftCard id and name are provided
//     if (!id || !name) {
//       return res
//         .status(400)
//         .json({ error: "GiftCard ID param and name are required" });
//     }

//     // Check if the name is already taken ===============
//     const existingGiftCard = await getGiftCardsFromDB(name);

//     if (existingGiftCard && existingGiftCard.length !== 0) {
//       return res.status(400).json({ error: "GiftCard name already exists" });
//     }

//     // update GiftCard =============================
//     const GiftCard = updateGiftCardNameInDB(id, name, color);

//     if (!GiftCard) {
//       return res.status(404).json({ error: "GiftCard not found" });
//     }

//     // Sending a success response
//     res.status(200).json({
//       data: GiftCard,
//       message: "GiftCard name updated successfully",
//     });
//   } catch (error) {
//     // Handling errors
//     console.error("Error updating GiftCard name:", error.message);
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
