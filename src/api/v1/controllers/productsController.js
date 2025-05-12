import { Product } from '../../../model/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: 'Failed to fetch all products',
      details: err.message,
    });
  }
};

