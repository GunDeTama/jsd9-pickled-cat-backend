import { Order } from '../../../model/Order.js';

// Create a new order by a guest
export const createOrder = async (req, res) => {
  try {
    const { user_id, order_items, total_price, status } = req.body;
    if (!order_items || order_items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }
    const newOrder = new Order({
      user_id,
      order_items,
      total_price,
      status,
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Create a new order by a logged-in user
export const createMyOrder = async (req, res) => {
  try {
    const order =await Order.findById(req.orderId).populate('user_id');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const newOrder = new Order({
      user_id: req.user._id,
      order_items: order.order_items,
      total_price: order.total_price,
      status: order.status,
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Get orders by Id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('_id');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order retrieved successfully', order });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};
