import { Router } from 'express';
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
} from '../controllers/paymentController.js';

const router = Router();

// Get all payments
router.get('/payments', getAllPayments);

// Get a payment By Id
router.get('/payment/:paymentId', getPaymentById);

// Create payment
router.post('/payments', createPayment);

// Edit payment
router.patch('/payments/:paymentId', updatePayment);

// Delete payment
router.delete('/payments/:paymentId', deletePayment);

export { router as paymentRoutes };
