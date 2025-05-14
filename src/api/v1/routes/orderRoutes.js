import express from 'express';
import {
  createMyOrder,
  createOrder,
  getMyOrder,
  getOrderById,
  updateOrderStatus,
} from '../controllers/ordersControllers.js';
import { isLogin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/orders', createOrder);
router.post('/orders/my', isLogin, createMyOrder);
router.get('/orders/my', isLogin, getMyOrder);
router.get('/orders/:orderId', getOrderById);
router.patch('/orders/:id/status', updateOrderStatus);

export { router as orderRoutes };
