import { Order } from '../../../model/Order.js';

// Create a new order by a guest
export const createOrder = async (req, res) => {
  try {
    const { order_items, total_price, status } = req.body;
    if (!order_items || order_items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }
    if (!total_price || !status) {
      return res
        .status(400)
        .json({ message: 'Total price and status are required' });
    }

    let calculatedTotal = 0;
    const shippingCost = 50;
    for (const item of order_items) {
      const { price, quantity, discount = 0 } = item;
      if (!price || !quantity) {
        return res.status(400).json({
          message: 'Each item must have price and quantity',
        });
      }

      const originalPrice = discount >= 100 ? 0 : price / (1 - discount / 100);

      const discountAmount = originalPrice * (discount / 100);

      const subtotal = (originalPrice - discountAmount) * quantity;

      calculatedTotal += subtotal;
    }
    calculatedTotal += shippingCost;
    if (Math.abs(calculatedTotal - total_price) > 1) {
      return res
        .status(400)
        .json({ message: 'Total price mismatch. Please try again.' });
    }

    const newOrder = new Order({
      order_items,
      total_price,
      status,
    });
    await newOrder.save();
    res
      .status(201)
      .json({ message: 'Order created successfully', order: newOrder });
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
    const { order_items, total_price, status } = req.body;
    if (!order_items || order_items.length === 0) {
      return res.status(404).json({ message: 'Order items are required' });
    }
    if (!total_price || !status) {
      return res
        .status(400)
        .json({ message: 'Total price and status are required' });
    }
    let calculatedTotal = 0;
    const shippingCost = 50;

    for (const item of order_items) {
      const { price, quantity, discount = 0 } = item;
      if (!price || !quantity) {
        return res.status(400).json({
          message: 'Each item must have price and quantity',
        });
      }

      const originalPrice = discount >= 100 ? 0 : price / (1 - discount / 100);
      const discountAmount = originalPrice * (discount / 100);
      const subtotal = (originalPrice - discountAmount) * quantity;

      calculatedTotal += subtotal;
    }
    calculatedTotal += shippingCost;

    if (Math.abs(calculatedTotal - total_price) > 1) {
      return res
        .status(400)
        .json({ message: 'Total price mismatch. Please try again.' });
    }
    const newOrder = new Order({
      user_id: req.user.user_id,
      order_items,
      total_price,
      status,
    });
    await newOrder.save();
    res
      .status(201)
      .json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Get my order
export const getMyOrder = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const orders = await Order.find({ user_id: userId }).sort({ order_at: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch your orders',
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

// Update status order
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Paid', 'Shipped', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order: updatedOrder });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};
