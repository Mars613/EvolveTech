const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a medicine name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity in stock'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Painkiller', 'Antibiotic', 'Vitamin', 'Supplement', 'Other'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please add an expiry date'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Medicine', MedicineSchema);
