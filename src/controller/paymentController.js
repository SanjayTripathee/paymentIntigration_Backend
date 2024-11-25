import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Payment } from "../schema/model.js";
import expressAsyncHandler from "express-async-handler";

// Initiate payment

export const processPayment = expressAsyncHandler(async (req, res) => {
  // const { itemId, totalPrice, name } = req.body;

  const formData = {
    return_url: `http://localhost:8000/payment/complete`,
    website_url: " https://localhost:5173",
    amount: 10 * 100, // Convert to paisa
    purchase_order_id: "new",
    order_id: "new",
    purchase_order_name: "sanjay",
  };

  const config = {
    headers: {
      Authorization: `Key ${process.env.KHALTI_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      formData,
      config
    );

    res.status(200).json({
      paymentMethod: "Khalti",
      message: "Success",
      response: response.data,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

// Verify payment
export const KhaltiResponse = async (req, res) => {
  const { pidx, amount, purchase_order_id, transaction_id } = req.query;

  try {
    const paymentInfo = await verifyKhaltiPayment(pidx);

    if (
      paymentInfo.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        paymentInfo,
      });
    }

    const paymentData = {
      resultStatus: paymentInfo.status,
      transactionId: transaction_id,
      pidx: pidx || uuidv4(),
      orderId: purchase_order_id,
      txnAmount: (amount / 100).toString(),
      txnType: "Wallet_payment",
      gatewayName: "Khalti",
      paymentMode: "Online",
      refundAmt: (paymentInfo.refund_amount || 0).toString(),
      txnDate: new Date().toISOString(),
    };
    //  res.redirect("http://localhost:5173");
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      paymentData,
    });
    await addPayment(paymentData);
    // res.redirect(`${process.env.WEBSITE_URL}/order/${purchase_order_id}`);
  } catch (error) {
    console.error("Error processing Khalti response:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing payment" });
  }
};

// Helper: Verify Khalti payment
export const verifyKhaltiPayment = async (pidx) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Key ${process.env.KHALTI_KEY}`,
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({ pidx });

  try {
    const response = await axios.post(
      `https://a.khalti.com/api/v2/epayment/lookup/`,
      body,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error verifying Khalti payment:", error);
    throw error;
  }
};

// Helper: Add payment to database
export const addPayment = async (data) => {
  try {
    const existingPayment = await Payment.findOne({
      transactionId: data.transactionId,
    });
    if (existingPayment) {
      console.log("Payment already exists");
      return;
    }

    await Payment.create(data);
    console.log("Payment added successfully");
  } catch (error) {
    console.error("Payment failed:", error.message);
  }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
  const { id: orderId } = req.params;

  try {
    const Payment = await Payment.findOne({ orderId });
    if (!paymentSchema) {
      return res.status(404).json({ error: "Payment not found" });
    }

    const txn = {
      id: payment.transactionId,
      status: payment.resultStatus,
    };

    res.status(200).json({
      success: true,
      txn,
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
