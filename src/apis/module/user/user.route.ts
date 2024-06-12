import express from "express";
import {
  createUser,
  getAllEmployeeByCompanyEmail,
  getUserByEmail,
  getUserById,
  getUsers,
  handleUserLogin,
} from "./user.controller";
const router = express.Router();

/*
   /
   /admins
   /:id   dynamic 
*/

router.get("/list", getUsers);
router.get("/list/:company_email", getAllEmployeeByCompanyEmail);
router.get("/email/:email", getUserByEmail);
router.get("/id/:id", getUserById);
router.post("/create", createUser);
router.post("/login", handleUserLogin);

export default router;
