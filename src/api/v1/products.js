import { Router } from 'express';
import {
  createProduct,
  editProduct,
  getAllProducts,
} from './controllers/productsController.js';

const router = Router();

// Get all products
router.get('/products', getAllProducts);

// Create product
router.post('/products', createProduct);

// Edit product
router.put('/products/:productId', editProduct);

export default router;
