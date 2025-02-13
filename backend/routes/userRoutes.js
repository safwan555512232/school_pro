import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Middleware to verify JWT token
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// GET /api/user/profile - Fetch user profile
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/user/profile - Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Find the user and update their profile
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Profile updated successfully.', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;