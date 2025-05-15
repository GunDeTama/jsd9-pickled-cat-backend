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

const router = express.Router();

// สร้าง Orders
router.post('/orders', createOrder);
router.post('/orders/my', createMyOrder);

// ดึงข้อมูล Orders
router.get('/orders', getAllOrders); // ดึง orders ทั้งหมดสำหรับ admin
router.get('/orders/my', getMyOrder);
router.get('/orders/status/:status', getOrdersByStatus); // ดึง orders ตาม status
router.get('/orders/:orderId', getOrderById);

// อัพเดท Status
router.patch('/orders/:id/status', updateOrderStatus);

export { router as orderRoutes };
