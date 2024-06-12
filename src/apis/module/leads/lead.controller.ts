import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { createLeadToDB, getLeadFromDB, updateLeadInDB } from "./lead.service";

// ==================== create user ======================
export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { name, message, phone, email, type } = data;

    if (!type) {
      return res.status(400).json({ error: "type is required" });
    }

    if (!email || !name || !phone) {
      return res
        .status(400)
        .json({ error: "email , name and phone are required" });
    }

    const result = await createLeadToDB(data);

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
export const getLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getLeadFromDB();

  res.status(200).json({
    status: "success",
    data: result,
  });
};

// ==================== update Leads ======================
export const updateLeadName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { name, message, phone, email, type } = data;

    if (!id) {
      return res.status(400).json({ error: "lead ID is required" });
    }

    // update Lead =============================
    const Lead = updateLeadInDB(id, { name, message, phone, email, type });

    if (!Lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    // Sending a success response
    res.status(200).json({
      data: Lead,
      message: "Lead updated successfully",
    });
  } catch (error: any) {
    // Handling errors
    console.error("Error updating Lead name:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// // ==================== update Leads ======================
// const updateLeadName = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, color } = req.body;

//     // Check if Lead id and name are provided
//     if (!id || !name) {
//       return res
//         .status(400)
//         .json({ error: "Lead ID param and name are required" });
//     }

//     // Check if the name is already taken ===============
//     const existingLead = await getLeadsFromDB(name);

//     if (existingLead && existingLead.length !== 0) {
//       return res.status(400).json({ error: "Lead name already exists" });
//     }

//     // update Lead =============================
//     const Lead = updateLeadNameInDB(id, name, color);

//     if (!Lead) {
//       return res.status(404).json({ error: "Lead not found" });
//     }

//     // Sending a success response
//     res.status(200).json({
//       data: Lead,
//       message: "Lead name updated successfully",
//     });
//   } catch (error) {
//     // Handling errors
//     console.error("Error updating Lead name:", error.message);
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
