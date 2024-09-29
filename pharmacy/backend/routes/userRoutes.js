// backend/routes/userRoutes.js

const express = require('express');
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user authentication (login)
router.post('/login', authUser);

// Route for getting the authenticated user's profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
