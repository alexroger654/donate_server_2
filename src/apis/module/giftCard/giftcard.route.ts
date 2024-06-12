import express from "express";
import {
  getGiftCard,
  createGiftCard,
  updateGiftCardName,
} from "./giftcard.controller";

const router = express.Router();

router.get("/list", getGiftCard);
router.post("/create", createGiftCard);
router.patch("/update/:id", updateGiftCardName);

export default router;
