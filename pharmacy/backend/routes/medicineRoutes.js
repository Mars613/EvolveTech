const express = require('express');
const {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} = require('../controllers/medicineCOntroller');

const router = express.Router();

// Public Routes
router.get('/', getMedicines);

// Private/Admin Routes
router.post('/', createMedicine); // Add a new medicine
router.put('/:id', updateMedicine); // Update an existing medicine by ID
router.delete('/:id', deleteMedicine); // Delete a medicine by ID

module.exports = router;
