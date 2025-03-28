import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/model.js';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({
      username 
    },
    process.env.JWT_SECRET,
    //{ expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Failed to log in' });
  }
});

export default router;