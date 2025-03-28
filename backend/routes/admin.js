import express from 'express';
import jwt from 'jsonwebtoken';
import { URL } from '../models/model.js';

const router = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Get all URLs (admin only)
router.get('/urls', authenticateToken, async (req, res) => {
  try {
    const urls = await URL.find().select('shortURL longURL visitCount');
    return res.status(200).json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return res.status(500).json({ error: 'Failed to fetch URLs' });
  }
});

export default router;