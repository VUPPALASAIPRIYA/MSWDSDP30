// server/models/Loan.js
const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  termMonths: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Status: Pending, Approved, Disbursed, Repaid
});

module.exports = mongoose.model('Loan', LoanSchema);
