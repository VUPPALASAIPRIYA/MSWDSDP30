// server/routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan'); // Assuming you have a 'models' folder

// Apply for a loan
router.post('/user/apply-loan', async (req, res) => {
  try {
    const { userId, amount, interestRate, termMonths } = req.body;

    const loan = new Loan({
      userId,
      amount,
      interestRate,
      termMonths,
      status: 'Pending',
    });

    const savedLoan = await loan.save();
    res.json(savedLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user's loans
router.get('/user/loans/:userId', async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.params.userId });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
