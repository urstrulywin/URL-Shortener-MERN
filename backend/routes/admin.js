import express from 'express';
import jwt from 'jsonwebtoken';
import { URL } from '../models/model.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Get all URLs (Admin only)
router.get('/urls', authenticateToken, async (req, res) => {
  try {
    const urls = await URL.find({})
      .sort({ createdAt: -1 })
      .select('shortURL longURL visitCount createdAt');
    
    res.status(200).json({
      success: true,
      data: urls
    });
  } catch (error) {
    console.error('Admin URL fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve URLs'
    });
  }
});

// Delete specific URL (Admin only)
router.delete('/urls/:shortUrl', authenticateToken, async (req, res) => {
  try {
    const deletedUrl = await URL.findOneAndDelete({ 
      shortURL: req.params.shortUrl 
    });

    if (!deletedUrl) {
      return res.status(404).json({
        success: false,
        error: 'URL not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'URL deleted successfully',
      data: {
        shortURL: deletedUrl.shortURL,
        longURL: deletedUrl.longURL
      }
    });
  } catch (error) {
    console.error('URL deletion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete URL'
    });
  }
});

export default router;