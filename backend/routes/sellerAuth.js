const express = require('express');
const router = express.Router();
const Seller = require('../model/Seller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await Seller.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Seller already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newSeller = new Seller({ email, password: hashed });
    await newSeller.save();

    res.status(201).json({ message: 'Seller registered' });
  } catch (err) {
    res.status(500).json({ message: 'Registration error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, seller.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ sellerId: seller._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});

module.exports = router;
