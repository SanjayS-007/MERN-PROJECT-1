const express = require('express');
const router = express.Router();
const { addIncome, getIncome } = require('../controllers/incomeController');

router.post('/', addIncome);
router.get('/', getIncome);

module.exports = router;
