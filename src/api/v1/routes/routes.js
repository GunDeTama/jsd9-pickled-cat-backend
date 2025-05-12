import { Router } from 'express';
import productRoutes from './productsRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/api', productRoutes);
router.use('/api', userRoutes);

export default router;
