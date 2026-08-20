const express = require('express');
const {
  getProjects, getProjectBySlug, createProject, updateProject, deleteProject, addProjectImages,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProjects);
router.post('/', protect, createProject);
router.get('/:slug', getProjectBySlug);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/:id/images', protect, addProjectImages);

module.exports = router;
