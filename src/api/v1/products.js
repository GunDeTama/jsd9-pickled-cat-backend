import { Router } from 'express';
import { createProduct, getAllProducts } from './controllers/productsController.js';

const router = Router();

// Get all products
router.get('/products', getAllProducts);

// Create product
router.post("/products", createProduct)

export default router;
