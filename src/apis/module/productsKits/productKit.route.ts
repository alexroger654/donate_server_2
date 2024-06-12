import express from "express";
import {
  getProduct,
  createProduct,
  updateProductName,
} from "./product.controller";

const router = express.Router();

router.get("/list", getProduct);
router.post("/create", createProduct);
router.patch("/update/:id", updateProductName);

export default router;
