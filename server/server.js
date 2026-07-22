const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/expensetracker';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/expenses', expenseRoutes);

// Health check / welcome route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running smoothly!');
});

// Connect to MongoDB & Start Server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    console.log('💡 Tip: Make sure your local MongoDB service is running, or provide a valid MONGODB_URI in server/.env');
    
    // Start Express server anyway so API endpoints return readable errors if DB is unreachable
    app.listen(PORT, () => {
      console.log(`🚀 Server running in fallback mode at http://localhost:${PORT}`);
    });
  });
