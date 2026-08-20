const express = require('express');
const {
  getBlogs, getBlogBySlug, getBlogCategories, createBlog, updateBlog, deleteBlog,
} = require('../controllers/blogController');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', optionalAuth, getBlogs);
router.get('/categories/all', getBlogCategories);
router.post('/', protect, createBlog);
router.get('/:slug', optionalAuth, getBlogBySlug);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
