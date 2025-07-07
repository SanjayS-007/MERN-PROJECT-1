const express = require('express');
const router = express.Router();
const { addExpense, getExpense } = require('../controllers/expenseController');

router.post('/', addExpense);
router.get('/', getExpense);

module.exports = router;
