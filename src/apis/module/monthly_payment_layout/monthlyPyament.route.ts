import express from "express";
import { getMonthlyPayment, createMonthlyPayment } from "./monthlyPayment.controller";




const router = express.Router();


router.get("/list", getMonthlyPayment);
router.post("/create", createMonthlyPayment);


export default router;