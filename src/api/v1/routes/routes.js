import { Router } from 'express';
import { productRoutes } from './productsRoutes.js';
import { userRoutes } from './userRoutes.js';

const router = Router();

router.use('/api', userRoutes);
router.use('/api', productRoutes);

export { router as apiRoutes };
