import { Router } from 'express';
import { productRoutes } from './productRoutes.js';
import { orderRoutes } from './orderRoutes.js';
import { userRoutes } from './userRoutes.js';

const router = Router();

router.use('/api', userRoutes);
router.use('/api', productRoutes);
router.use('/api', orderRoutes);

export { router as apiRoutes };
