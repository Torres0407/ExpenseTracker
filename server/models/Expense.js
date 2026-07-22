const mongoose = require('mongoose');

// Define Schema for Expenses
// Fields: title (text), amount (number), category (text), date (date)
const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the expense'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
    min: [0, 'Amount must be a positive number']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    default: 'Other'
  },
  date: {
    type: Date,
    required: [true, 'Please select a date'],
    default: Date.now
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Expense', expenseSchema);
