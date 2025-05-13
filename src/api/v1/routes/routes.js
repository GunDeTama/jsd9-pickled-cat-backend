import { Router } from 'express';
import { productRoutes } from './productsRoutes.js';
import { usersRoutes } from './usersRoutes.js';

const router = Router();

router.use('/api', usersRoutes);
router.use('/api', productRoutes);

export { router as apiRoutes };
