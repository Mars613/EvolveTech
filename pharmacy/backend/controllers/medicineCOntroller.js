const Medicine = require('../models/Medicine'); // Adjust path as needed

// @desc    Get all medicines
// @route   GET /api/medicines
// @access  Public
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res.json(medicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new medicine
// @route   POST /api/medicines
// @access  Private/Admin
const createMedicine = async (req, res) => {
  const { name, description, price, quantity, category, expiryDate } = req.body;

  // Validate required fields
  if (!name || !description || !price || !quantity || !category || !expiryDate) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const medicine = await Medicine.create({
      name,
      description,
      price,
      quantity,
      category,
      expiryDate,
    });

    res.status(201).json(medicine);
  } catch (error) {
    console.error('Error creating medicine:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a medicine
// @route   PUT /api/medicines/:id
// @access  Private/Admin
const updateMedicine = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category, expiryDate } = req.body;

  try {
    const medicine = await Medicine.findByIdAndUpdate(
      id,
      { name, description, price, quantity, category, expiryDate },
      { new: true, runValidators: true } // Validate against the schema
    );

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json(medicine);
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a medicine
// @route   DELETE /api/medicines/:id
// @access  Private/Admin
const deleteMedicine = async (req, res) => {
  const { id } = req.params;

  try {
    const medicine = await Medicine.findByIdAndDelete(id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json({ message: 'Medicine removed' });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
