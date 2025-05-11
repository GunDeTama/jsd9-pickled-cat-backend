import { Product } from '../../../model/Product.js';

// Get all product
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

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      stock,
      category,
      option = [],
      sizes = [],
      images = [],
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      discount,
      stock,
      category,
      option,
      sizes,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: 'Failed to create product',
      details: err.message,
    });
  }
};
