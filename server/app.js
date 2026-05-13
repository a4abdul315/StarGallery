const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to StarGallery API' });
});

module.exports = app;
