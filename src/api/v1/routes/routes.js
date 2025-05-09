import { Router } from 'express';
import products from '../products.js';

const router = Router();

router.use('/api', products);

export default router;
