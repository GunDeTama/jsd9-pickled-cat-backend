import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
} from './controllers/productsController.js';

const router = Router();

// Get all products
router.get('/products', getAllProducts);

// Get a product By Id
router.get('/product/:productId', getProductById);

// Create product
router.post('/products', createProduct);

// Edit product
router.put('/products/:productId', editProduct);

// Delete product
router.delete('/products/:productId', deleteProduct);

export default router;
