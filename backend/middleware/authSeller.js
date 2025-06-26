const jwt = require('jsonwebtoken');

const authSeller = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  console.log('Incoming token', token); 

  if (!token) {
    console.log('Token missing');
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT', decoded); 
    req.sellerId = decoded.sellerId;
    next();
  } catch (err) {
    console.error('JWT verification error', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authSeller;
