const express = require('express');

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/about', require('./aboutRoutes'));
router.use('/settings', require('./settingsRoutes'));
router.use('/skills', require('./skillRoutes'));
router.use('/skill-categories', require('./skillCategoryRoutes'));
router.use('/projects', require('./projectRoutes'));
router.use('/experience', require('./experienceRoutes'));
router.use('/education', require('./educationRoutes'));
router.use('/certifications', require('./certificationRoutes'));
router.use('/reviews', require('./reviewRoutes'));
router.use('/blogs', require('./blogRoutes'));
router.use('/social-links', require('./socialLinkRoutes'));
router.use('/contact', require('./contactRoutes'));
router.use('/admin', require('./adminRoutes'));
router.use('/stats', require('./statsRoutes'));
router.use('/upload', require('./uploadRoutes'));

router.get('/health', (_req, res) => res.json({ success: true, message: 'API is healthy' }));

module.exports = router;
