import { Router } from 'express';
import products from '../products.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/api', products);
router.use('/api', userRoutes);

export default router;
