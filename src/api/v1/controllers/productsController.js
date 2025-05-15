import { Product } from '../../../model/Product.js';

// Get all products
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

// Get a product by id
export const getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found',
      });
    }

    return res.json({
      error: false,
      product,
      message: 'Product retrieved successfully',
    });
  } catch (err) {
    console.error('Error fetching product:', error);
    return res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

// Create product
export const createProduct = async (req, res) => {
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
  try {
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

// Edit product
export const editProduct = async (req, res) => {
  const productId = req.params.productId;
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
  if (
    name === undefined ||
    description === undefined ||
    price === undefined ||
    category === undefined ||
    images === undefined ||
    !Array.isArray(images) ||
    images.length < 1
  ) {
    return res.status(400).json({
      error: true,
      message: 'Required fields are missing or invalid.',
    });
  }
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found',
      });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (discount) product.discount = discount;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (option) product.option = option;
    if (sizes) product.sizes = sizes;
    if (images) product.images = images;

    await product.save();

    return res.json({
      error: false,
      product,
      message: 'Product updated successfully',
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found',
      });
    }
    await Product.deleteOne({ _id: productId });

    return res.json({
      error: false,
      message: 'Product deleted successfully',
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};
