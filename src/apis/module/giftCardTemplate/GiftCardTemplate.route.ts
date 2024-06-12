import express from "express";
import {
  getGiftCardTemplate,
  createGiftCardTemplate,
  updateGiftCardTemplateName,
} from "./GiftCardTemplate.controller";

const router = express.Router();

router.get("/list", getGiftCardTemplate);
router.post("/create", createGiftCardTemplate);
router.patch("/update/:id", updateGiftCardTemplateName);

export default router;
