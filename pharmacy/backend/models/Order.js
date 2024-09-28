// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    medicines: [
        {
            medicine: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Medicine', // Assuming you have a Medicine model
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1, // Ensure quantity is at least 1
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
