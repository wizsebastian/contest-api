// middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the user from the payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};