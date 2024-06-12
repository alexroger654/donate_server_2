import express from "express";
import { createTransaction, getTransaction } from "./transaction.controller";


const router = express.Router();


router.get("/list", getTransaction);
router.post("/create", createTransaction);


export default router;