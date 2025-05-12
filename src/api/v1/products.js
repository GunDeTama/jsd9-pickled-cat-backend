import { Router } from 'express';
import { getAllProducts } from './controllers/productsController.js';

const router = Router();

// Get all products
router.get('/products', getAllProducts);


export default router;
