const express = require('express');
const { getContactMessages, markAsRead, deleteContactMessage } = require('../controllers/contactController');
const { getAdminStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes under /api/admin/* require authentication.
router.use(protect);

router.get('/contact-messages', getContactMessages);
router.patch('/contact-messages/:id/read', markAsRead);
router.delete('/contact-messages/:id', deleteContactMessage);

router.get('/dashboard/stats', getAdminStats);

module.exports = router;
