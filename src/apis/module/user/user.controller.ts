import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createUserToDB,
  getAllUsersFromDBByCompanyEmail,
  getUserByEmailFromDB,
  getUserByIdFromDB,
  getUsersFromDB,
} from "./user.service";
import User from "./user.model";

// ==================== create user ======================
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { email, password, role } = data;

    // ============== check if email, password and role are provided ===============
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email, password are required",
      });
    }
    // ============== check if user already exists===============
    const isExists = await getUserByEmailFromDB(email);
    if (isExists) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }
    // ============== hash password ===============
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 15);
    }

    const user = await createUserToDB({ ...data, password: hashedPassword });

    res.status(200).json({
      status: "success",
      data: user?.email,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: `User creation failed ${err}`,
    });
  }
};

// ==================== get users ======================
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await getUsersFromDB();

  res.status(200).json({
    status: "success",
    data: user,
  });
};

// ==================== get user by id ======================
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = await getUserByIdFromDB(id);

  res.status(200).json({
    status: "success",
    data: user,
  });
};

// ==================== get user by email ======================
export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;
  const user = await getUserByEmailFromDB(email);
  console.log("hitted from getUserById", email);

  res.status(200).json({
    status: "success",
    data: user,
  });
};

export const getAllEmployeeByCompanyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { company_email } = req.params;
  console.log("companyEmail", company_email);
  const user = await getAllUsersFromDBByCompanyEmail(company_email);
  res.status(200).json({
    status: "success",
    data: user,
  });
};

// ==================== login ======================
export const handleUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { email, password } = data;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required",
    });
  }

  const user = await getUserByEmailFromDB(email);

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "User not found",
    });
  }

  console.log(user);

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Password is incorrect",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }
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
