import express from "express";
import { getDonation, createDonation } from "./donation.controller";

const router = express.Router();

router.get("/list", getDonation);
router.post("/create", createDonation);

export default router;
