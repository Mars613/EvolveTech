// backend/controllers/userController.js

const User = require('../models/Users');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { role, name, hospital, surgery, email, password } = req.body;
  
  // Check for required fields
  if (!role || !name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if role is valid
  const validRoles = ['admin', 'pharmacist', 'customer', 'doctor'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: `Role must be one of: ${validRoles.join(', ')}` });
  }

  // If role is doctor, hospital and surgery are required
  if (role === 'doctor' && (!hospital || !surgery)) {
    return res.status(400).json({ message: 'Please provide hospital and surgery details for doctors' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the user
    const userData = {
      role,
      name,
      email,
      password,
    };

    if (role === 'doctor') {
      userData.hospital = hospital;
      userData.surgery = surgery;
    }

    const user = await User.create(userData);
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error in authUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = req.user;

  if (user) {
    res.json({
      _id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      hospital: user.hospital,
      surgery: user.surgery,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, authUser, getUserProfile };
