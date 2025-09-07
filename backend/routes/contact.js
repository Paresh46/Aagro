import express from 'express';
import { saveContact } from '../controllers/contactController.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const validateContact = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  }
];

router.post('/contact', validateContact, saveContact);

export default router; 