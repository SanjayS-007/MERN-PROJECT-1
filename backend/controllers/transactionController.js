// controllers/transactionController.js

const Income = require('../models/Income');
const Expense = require('../models/Expense');

// POST /api/transactions
const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;

    if (type === 'credit') {
      const income = new Income({ amount, category, date });
      await income.save();
      return res.status(201).json({ message: 'Income added!', data: income });
    } else if (type === 'debit') {
      const expense = new Expense({ amount, category, date });
      await expense.save();
      return res.status(201).json({ message: 'Expense added!', data: expense });
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = { addTransaction };
