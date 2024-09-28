// backend/controllers/orderController.js
const Order = require('../models/Order');
const Medicine = require('../models/Medicine');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { medicines } = req.body;
  
  if (!medicines || medicines.length === 0) {
    return res.status(400).json({ message: 'No medicines selected' });
  }
  
  let totalAmount = 0;
  const medicineDetails = [];
  
  for (const item of medicines) {
    const medicine = await Medicine.findById(item.medicine);
    if (!medicine) {
      return res.status(404).json({ message: `Medicine not found: ${item.medicine}` });
    }
    
    if (medicine.quantityInStock < item.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${medicine.name}` });
    }
    
    medicine.quantityInStock -= item.quantity;
    await medicine.save();
    
    totalAmount += medicine.price * item.quantity;
    medicineDetails.push({ medicine: medicine._id, quantity: item.quantity });
  }
  
  const order = new Order({
    user: req.user._id,
    medicines: medicineDetails,
    totalAmount,
  });
  
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('medicines.medicine', 'name price');
  res.json(orders);
};

module.exports = { createOrder, getUserOrders };
