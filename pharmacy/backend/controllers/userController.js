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
  
  if (!role || !name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const user = await User.create({
    role,
    name,
    hospital: role === 'doctor' ? hospital : undefined,
    surgery: role === 'doctor' ? surgery : undefined,
    email,
    password,
  });
  
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
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  
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
