import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteItem,
} from "./category.controller";

const router = express.Router();

/*
   /
   /admins
   /admins
   /:id   dynamic 
*/

router.get("/list", getCategory);
router.post("/create", createCategory);
router.post("/update/:id", updateCategory);
router.delete("/delete/:id", deleteItem);
export default router;
