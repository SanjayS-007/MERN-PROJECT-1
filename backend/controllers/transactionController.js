// controllers/transactionController.js

const Income = require('../models/Income');
const Expense = require('../models/Expense');

// POST /api/transactions
const addTransaction = async (req, res) => {
  try {
    const { type, title, description, amount, category, date } = req.body;

    if (!type || !title || !amount || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (type === 'credit') {
      const income = new Income({ title, description, amount, category, date });
      await income.save();
      return res.status(201).json({ message: 'Income added!', data: income });
    } else if (type === 'debit') {
      const expense = new Expense({ title, description, amount, category, date });
      await expense.save();
      return res.status(201).json({ message: 'Expense added!', data: expense });
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addTransaction };
