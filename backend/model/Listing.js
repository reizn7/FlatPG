const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  image: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller', 
  },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
