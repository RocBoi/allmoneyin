// routes/user.routes.js

import express from 'express';

const router = express.Router();

// In-memory mock users array (replace with DB logic in production)
let users = [];

// Create a new user
router.post('/register', (req, res) => {
  const { username, email, wallet } = req.body;

  if (!username || !email || !wallet) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = { id: users.length + 1, username, email, wallet };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by wallet address
router.get('/:wallet', (req, res) => {
  const { wallet } = req.params;
  const user = users.find(u => u.wallet === wallet);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

export default router;
