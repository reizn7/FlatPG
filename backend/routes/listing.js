const express = require('express');
const router = express.Router();
const Listing = require('../model/Listing');
const authSeller = require('../middleware/authSeller');

// GET all listings
router.get('/all', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch listings' });
  }
});

// GET single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new listing (authenticated seller only)
router.post('/addlist', authSeller, async (req, res) => {
  const { title, description, price, location, image } = req.body;

  try {
    console.log('Seller ID from token', req.sellerId); 

    const newListing = new Listing({
      title,
      description,
      price,
      location,
      image,
      seller: req.sellerId 
    });

    await newListing.save();
    res.status(201).json({ message: 'Listing added' });
  } catch (err) {
    console.error('Error in /addlist', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


module.exports = router;
