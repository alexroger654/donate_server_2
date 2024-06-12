import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createGiftCardTemplateToDB,
  getGiftCardTemplateFromDB,
  updateGiftCardTemplateInDB,
} from "./GiftCardTemplate.service";

// ==================== create user ======================
export const createGiftCardTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const gift_card_id = generateUniqueId();

    const result = await createGiftCardTemplateToDB({ ...data, gift_card_id });

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
export const getGiftCardTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getGiftCardTemplateFromDB();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// ==================== update GiftCardTemplates ======================
export const updateGiftCardTemplateName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ error: "GiftCardTemplate ID is required" });
    }

    // update GiftCardTemplate =============================
    const GiftCardTemplate = updateGiftCardTemplateInDB(id, data);

    if (!GiftCardTemplate) {
      return res.status(404).json({ error: "GiftCardTemplate not found" });
    }

    // Sending a success response
    res.status(200).json({
      data: GiftCardTemplate,
      message: "GiftCardTemplate updated successfully",
    });
  } catch (error: any) {
    // Handling errors
    console.error("Error updating GiftCardTemplate name:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// // ==================== update GiftCardTemplates ======================
// const updateGiftCardTemplateName = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, color } = req.body;

//     // Check if GiftCardTemplate id and name are provided
//     if (!id || !name) {
//       return res
//         .status(400)
//         .json({ error: "GiftCardTemplate ID param and name are required" });
//     }

//     // Check if the name is already taken ===============
//     const existingGiftCardTemplate = await getGiftCardTemplatesFromDB(name);

//     if (existingGiftCardTemplate && existingGiftCardTemplate.length !== 0) {
//       return res.status(400).json({ error: "GiftCardTemplate name already exists" });
//     }

//     // update GiftCardTemplate =============================
//     const GiftCardTemplate = updateGiftCardTemplateNameInDB(id, name, color);

//     if (!GiftCardTemplate) {
//       return res.status(404).json({ error: "GiftCardTemplate not found" });
//     }

//     // Sending a success response
//     res.status(200).json({
//       data: GiftCardTemplate,
//       message: "GiftCardTemplate name updated successfully",
//     });
//   } catch (error) {
//     // Handling errors
//     console.error("Error updating GiftCardTemplate name:", error.message);
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

function generateUniqueId() {
  let id = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i++) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return id;
}
