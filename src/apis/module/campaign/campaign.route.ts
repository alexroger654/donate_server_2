import express from "express";
import {
  createCampaign,
  getCampaign,
  updateCampaignName,
} from "./campaign.controller";

const router = express.Router();

router.get("/list", getCampaign);
router.post("/create", createCampaign);
router.patch("/update/:id", updateCampaignName);

export default router;
