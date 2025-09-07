import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, (req, res) => {
  res.json({ message: 'This is a protected route!', userId: req.user });
});

export default router; 