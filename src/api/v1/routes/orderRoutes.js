import express from 'express';
import {
  createMyOrder,
  createOrder,
  getAllOrders,
  getMyOrder,
  getOrderById,
  getOrdersByStatus,
  updateOrderStatus,
} from '../controllers/ordersControllers.js';
import { isLogin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// สร้าง Orders
router.post('/orders/my', isLogin, createMyOrder);
router.post('/orders', createOrder);

// ดึงข้อมูล Orders
router.get('/orders/my', isLogin, getMyOrder);
router.get('/orders', getAllOrders); // ดึง orders ทั้งหมดสำหรับ admin
router.get('/orders/status/:status', getOrdersByStatus); // ดึง orders ตาม status
router.get('/orders/:orderId', getOrderById);


// อัพเดท Status
router.patch('/orders/:id/status', updateOrderStatus);

export { router as orderRoutes };
