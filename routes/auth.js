const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ConnectionPoolMonitoringEvent } = require('mongodb');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    console.log("the user", user);
    ConnectionPoolMonitoringEvent
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    // Create a payload for JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the JWT token and send it in the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @desc    Authenticate user and get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare submitted password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASS COMPARaTIVe", password === user.password, isMatch)

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a payload for JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the JWT token and send it in the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;