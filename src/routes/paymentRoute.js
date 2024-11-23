import express from "express";
import {
  getPaymentStatus,
  KhaltiResponse,
  processPayment,
} from "../controller/paymentController.js";
import isAuthenticated from "../middlewire/isAuthenticated.js";

const router = express.Router();

router.post("/payment/process", processPayment);

router.get("/payment/complete", KhaltiResponse);

router.get("/payment/status/:id", isAuthenticated, getPaymentStatus);

export default router;
