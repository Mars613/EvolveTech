// Load environment variables
require('dotenv').config();
console.log('Environment Variables:', process.env);
// Import necessary modules
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
const medicineRoutes = require('./routes/medicineRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Define routes
app.use('/api/medicines', medicineRoutes);
app.use('/api/users', userRoutes); // Use user routes

// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000; // Default port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Fix: wrapped in backticks for template literals
    console.log('MongoDB URI:', uri);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    

});

console.log('MongoDB URI:', uri);
