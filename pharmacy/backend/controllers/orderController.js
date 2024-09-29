// backend/controllers/orderController.js

const Order = require('../models/Order');

// Function to create a new order
const createOrder = async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body for debugging

    const { medicines = [], totalAmount = 0 } = req.body;

    // Validate the medicines array
    if (!Array.isArray(medicines) || medicines.length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: "No products provided" 
        });
    }

    // Validate each medicine item for quantity and medicine ID
    for (const item of medicines) {
        if (!item.medicine || typeof item.quantity !== 'number' || item.quantity <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid medicine data" 
            });
        }
    }

    // Validate the totalAmount
    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid total amount" 
        });
    }

    try {
        // Create a new order with the provided data
        const order = new Order({
            user: req.user._id, // Get the user ID from the request
            medicines,
            totalAmount,
        });

        // Save the order to the database
        const createdOrder = await order.save();
        
        // Send back a success response
        res.status(201).json({ 
            success: true, 
            message: "Order created successfully", 
            order: createdOrder 
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            success: false, 
            message: "Server error while creating order" 
        });
    }
};

// Function to get orders for the logged-in user (optional)
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('medicines.medicine'); // Populate medicine details
        res.status(200).json({ 
            success: true, 
            orders 
        });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ 
            success: false, 
            message: "Server error while fetching orders" 
        });
    }
};

module.exports = {
    createOrder,
    getUserOrders, // Export the getUserOrders function
};
