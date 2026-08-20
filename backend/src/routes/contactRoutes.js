const express = require('express');
const rateLimit = require('express-rate-limit');
const { submitContactMessage } = require('../controllers/contactController');

const router = express.Router();

// Prevent contact-form spam/abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages sent. Please try again later.' },
});

router.post('/', contactLimiter, submitContactMessage);

module.exports = router;
