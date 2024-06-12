import express from "express";
import { getFaq, createFaq } from "./faq.controller";



const router = express.Router();


router.get("/list", getFaq);
router.post("/create", createFaq);


export default router;