import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { createMonthlyPaymentToDB, getMonthlyPaymentFromDB } from "./monthlyPayment.service";



// ==================== create user ======================
export const createMonthlyPayment= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
try{
    const data = req.body;
    const { name, description } = data;
    const slug = name.toLowerCase().replace(/ /g, "-");
    
    const result = await createMonthlyPaymentToDB({...data, slug});

  res.status(200).json({
    status: "success",
    data: result,
    message: " created successfully",
  });
}catch(err){
  res.status(500).json({
    status: "error",
    message: ` creation failed ${err}`,
  });
}
};





// ==================== get users ======================
export const getMonthlyPayment= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getMonthlyPaymentFromDB();

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