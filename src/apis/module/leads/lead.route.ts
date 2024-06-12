import express from "express";
import { getLead, createLead, updateLeadName } from "./lead.controller";




const router = express.Router();


router.get("/list", getLead);
router.post("/create", createLead);
router.patch('/update/:id', updateLeadName)


export default router;