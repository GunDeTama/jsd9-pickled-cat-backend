import { Payment } from "../../../model/payments";

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to get payments",
      details: err.message,
    });
  }
};

export const getPaymentById = async (req, res) => {
  const paymentId = req.params.paymentId;
  try {
    const payment = await Payment.findById({_id :paymentId});
    if (!payment){
      return res.status(404).json({
        error: true,
        message: "Payment not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Payment found",
      data: payment,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to get payment",
      details: err.message,
    });
  }
};

export const createPayment = async (req, res) => {
  const { orderId, paymentId, amount, method, status, paidAt, updateAt } = req.body;
  try {
    const payment = await Payment.create({
      orderId,
      paymentId,
      amount,
      method,
      status,
      paidAt,
      updateAt,
    });
    res.status(201).json({
      error: false,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to create payment",
      details: err.message,
    });
  }
};

export const updatePayment = async (req, res) => {
  const paymentId = req.params.paymentId;
  const { orderId, amount, status, paidAt, updateAt } = req.body;
  try {
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { orderId, amount, status, paidAt, updateAt },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({
        error: true,
        message: "Payment not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to update payment",
      details: err.message,
    });
  }
};

export const deletePayment = async (req, res) => {
  const paymentId = req.params.paymentId;
  try {
    const payment = await Payment.findByIdAndDelete(paymentId);
    if (!payment) {
      return res.status(404).json({
        error: true,
        message: "Payment not found",
      });
    }
    return res.status(200).json({
      error: false,
      message: "Payment deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to delete payment",
      details: err.message,
    });
  }
};

