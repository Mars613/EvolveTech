// backend/routes/medicineRoutes.js
const express = require('express');
const { getMedicines, addMedicine } = require('../controllers/medicineCOntroller');
// const { protect, admin } = require('../middleware/authMiddleware'); // Implement admin middleware if needed

const router = express.Router();

router.get('/', getMedicines);
router.post('/', addMedicine); // Add 'protect, admin' middleware if restricted

module.exports = router;
