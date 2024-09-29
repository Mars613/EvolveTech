// backend/models/Users.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Exclude password from query results by default
    },
    role: {
      type: String,
      enum: ['admin', 'pharmacist', 'customer', 'doctor'], // Added 'doctor' role
      default: 'customer',
    },
    hospital: {
      type: String,
      required: function() { return this.role === 'doctor'; }, // Required only for doctors
      trim: true,
    },
    surgery: {
      type: String,
      required: function() { return this.role === 'doctor'; }, // Required only for doctors
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to match entered password to hashed password in DB
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
