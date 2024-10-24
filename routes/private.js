// routes/private.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET /api/private
// @desc    Access private data
// @access  Private
router.get('/', auth, (req, res) => {
  res.json({ msg: 'Welcome to the private route!', user: req.user });
});

module.exports = router;