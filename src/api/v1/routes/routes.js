import { Router } from 'express';
import products from './productsRoutes.js';

const router = Router();

router.use('/api', products);

export default router;
