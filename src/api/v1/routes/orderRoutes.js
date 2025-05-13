import express from 'express';
import {
  createMyOrder,
  createOrder,
  getOrderById,
} from '../controllers/ordersControllers.js';

const router = express.Router();

router.post('/orders', createOrder);
router.post('/orders/my', createMyOrder);
router.get('/orders/:orderId', getOrderById);

export { router as orderRoutes };
