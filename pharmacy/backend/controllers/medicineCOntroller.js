// backend/controllers/medicineController.js
const Medicine = require('../models/Medicine');

// @desc    Get all medicines
// @route   GET /api/medicines
// @access  Public
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new medicine
// @route   POST /api/medicines
// @access  Private (Admin)
// Implement admin middleware if needed
const addMedicine = async (req, res) => {
  const { name, description, price, quantityInStock } = req.body;
  
  const medicine = new Medicine({
    name,
    description,
    price,
    quantityInStock,
  });
  
  const createdMedicine = await medicine.save();
  res.status(201).json(createdMedicine);
};

module.exports = { getMedicines, addMedicine };
