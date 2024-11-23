import express from "express";
import {
  getPaymentStatus,
  KhaltiResponse,
  processPayment,
} from "../controller/paymentController.js";
import isAuthenticated from "../middlewire/isAuthenticated.js";

const router = express.Router();

router.post("/process", processPayment);

router.get("/complete", KhaltiResponse);

router.get("/status/:id", isAuthenticated, getPaymentStatus);

export default router;
