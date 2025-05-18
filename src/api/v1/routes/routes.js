import { Router } from 'express';
import { orderRoutes } from './orderRoutes.js';
import { paymentRoutes } from './paymentRoutes.js';
import { productRoutes } from './productRoutes.js';
import { userRoutes } from './userRoutes.js';

const router = Router();

router.use('/api', userRoutes);
router.use('/api', productRoutes);
router.use('/api', orderRoutes);
router.use('/api', paymentRoutes);

export { router as apiRoutes };
