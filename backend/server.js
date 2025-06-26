require('dotenv').config();           // Load environment variables

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();                         

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/listings', require('./routes/listing'));
app.use('/auth', require('./routes/auth'));
app.use('/seller', require('./routes/sellerAuth'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
