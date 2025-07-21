// routes/payment.routes.js

import express from 'express';

const router = express.Router();

// In-memory mock payment storage
let payments = [];

/**
 * POST /api/payments
 * Record a new payment
 */
router.post('/', (req, res) => {
  const { nftId, payerWallet, amount, txHash } = req.body;

  if (!nftId || !payerWallet || !amount || !txHash) {
    return res.status(400).json({ message: 'All payment fields are required' });
  }

  const payment = {
    id: payments.length + 1,
    nftId,
    payerWallet,
    amount,
    txHash,
    paidAt: new Date(),
  };

  payments.push(payment);

  res.status(201).json({
    message: 'Payment recorded successfully',
    payment,
  });
});

/**
 * GET /api/payments
 * Get all payment records
 */
router.get('/', (req, res) => {
  res.json(payments);
});

/**
 * GET /api/payments/:id
 * Get a single payment by ID
 */
router.get('/:id', (req, res) => {
  const payment = payments.find(p => p.id === parseInt(req.params.id));
  if (!payment) {
    return res.status(404).json({ message: 'Payment not found' });
  }
  res.json(payment);
});

/**
 * GET /api/payments/wallet/:wallet
 * Get all payments by a specific wallet address
 */
router.get('/wallet/:wallet', (req, res) => {
  const wallet = req.params.wallet.toLowerCase();
  const walletPayments = payments.filter(p => p.payerWallet.toLowerCase() === wallet);

  if (walletPayments.length === 0) {
    return res.status(404).json({ message: 'No payments found for this wallet' });
  }

  res.json(walletPayments);
});

export default router;
