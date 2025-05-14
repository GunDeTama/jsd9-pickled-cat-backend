import express from 'express';
import {
  createMyOrder,
  createOrder,
  getMyOrder,
  getOrderById,
  updateOrderStatus,
} from '../controllers/ordersControllers.js';

const router = express.Router();

router.post('/orders', createOrder);
router.post('/orders/my', createMyOrder);
router.get('/orders/my', getMyOrder);
router.get('/orders/:orderId', getOrderById);
router.patch('/orders/:id/status', updateOrderStatus);

export { router as orderRoutes };
