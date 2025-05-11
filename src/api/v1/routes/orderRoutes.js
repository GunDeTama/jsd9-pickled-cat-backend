import express from 'express';
import {
  createOrder,
  createMyOrder,
  getOrderById
} from '../controllers/order.controller.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/orders', createOrder);
router.post('/orders/my', auth, createMyOrder);
router.get('/orders/:id', auth, getOrderById);

export default router;
