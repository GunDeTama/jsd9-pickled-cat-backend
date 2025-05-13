import { Router } from 'express';
import { productRoutes } from './productsRoutes.js';
import { userRoutes } from './userRoutes.js';
import { orderRoutes } from './orderRoutes.js';

const router = Router();

router.use('/api', userRoutes);
router.use('/api', productRoutes);
router.use('/api', orderRoutes);

export { router as apiRoutes };
