// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI from .env file
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/medicart'; // Fallback URI for local testing

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB Connection Failed:', err));

// Import routes
const medicineRoutes = require('./routes/medicineRoutes'); // Ensure this exists
const userRoutes = require('./routes/userRoutes'); // Ensure this exists
const orderRoutes = require('./routes/orderRoutes'); // Order routes

// Define routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes); // Use order routes

// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000; // Default port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Corrected template string syntax
});
