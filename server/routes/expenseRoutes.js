const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// 1. GET ALL EXPENSES
// Route: GET /api/expenses
router.get('/', async (req, res) => {
  try {
    // Fetch all expenses, sorted by date (newest first)
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch expenses', error: error.message });
  }
});

// 2. ADD A NEW EXPENSE
// Route: POST /api/expenses
router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // Simple validation
    if (!title || amount === undefined || !category) {
      return res.status(400).json({ message: 'Please provide title, amount, and category' });
    }

    const newExpense = new Expense({
      title,
      amount: Number(amount),
      category,
      date: date ? new Date(date) : new Date()
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create expense', error: error.message });
  }
});

// 3. DELETE AN EXPENSE
// Route: DELETE /api/expenses/:id
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.deleteOne();
    res.status(200).json({ message: 'Expense deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
  }
});

module.exports = router;
