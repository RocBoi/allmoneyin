import express from 'express';
import Subscriber from '../models/subscriber.js';
import { sendConfirmationEmail } from '../utils/sendEmail.js';

const router = express.Router();

// @route   POST /api/subscribers
// @desc    Subscribe a new email to the mailing list
// @access  Public
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email is already subscribed.' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send confirmation email
    await sendConfirmationEmail(email);

    res.status(201).json({ message: 'Subscription successful. Confirmation email sent.', subscriber: newSubscriber });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error during subscription.' });
  }
});

export default router;
