const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log('Request Headers:', token); // Log request headers for debugging

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    
    console.log('Decoded Token:', decoded); // Log the decoded token for debugging

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
}


module.exports = {
  generateToken,
  verifyToken
};
