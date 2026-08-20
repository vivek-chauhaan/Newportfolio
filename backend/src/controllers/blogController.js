const Blog = require('../models/Blog');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendSuccess, paginate } = require('../utils/apiResponse');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

function computeReadingTime(content = '') {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// GET /api/blogs?search=&page=&size=
// Public visitors only ever see published posts; an authenticated admin
// (optionalAuth) also sees drafts, since the admin BlogManage screen reuses
// this same endpoint.
const getBlogs = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const page = Math.max(0, parseInt(req.query.page, 10) || 0);
  const size = Math.min(100, Math.max(1, parseInt(req.query.size, 10) || 9));

  const filter = {};
  if (!req.user) filter.published = true;
  if (search) filter.$text = { $search: search };

  const [items, totalElements] = await Promise.all([
    Blog.find(filter)
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(page * size)
      .limit(size),
    Blog.countDocuments(filter),
  ]);

  sendSuccess(res, { data: paginate({ items, totalElements, page, size }) });
});

// GET /api/blogs/:slug
const getBlogBySlug = asyncHandler(async (req, res) => {
  const filter = { slug: req.params.slug };
  if (!req.user) filter.published = true;

  const blog = await Blog.findOne(filter);
  if (!blog) throw new ApiError(404, 'Blog post not found.');
  sendSuccess(res, { data: blog });
});

// GET /api/blogs/categories/all
const getBlogCategories = asyncHandler(async (_req, res) => {
  const categories = await Blog.distinct('category', { category: { $nin: ['', null] } });
  sendSuccess(res, { data: categories.map((name) => ({ id: name, name })) });
});

// POST /api/blogs
const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) throw new ApiError(400, 'title and content are required.');

  const slug = await generateUniqueSlug(Blog, title);
  const category = req.body.categoryId || req.body.category || '';

  const blog = await Blog.create({
    ...req.body,
    slug,
    category,
    readingTime: computeReadingTime(content),
  });

  sendSuccess(res, { statusCode: 201, message: 'Blog post created', data: blog });
});

// PUT /api/blogs/:id
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, 'Blog post not found.');

  const updates = { ...req.body };
  delete updates.id;

  if (updates.title && updates.title !== blog.title) {
    updates.slug = await generateUniqueSlug(Blog, updates.title, blog._id);
  }
  if (updates.categoryId !== undefined) {
    updates.category = updates.categoryId;
    delete updates.categoryId;
  }
  if (updates.content) {
    updates.readingTime = computeReadingTime(updates.content);
  }

  Object.assign(blog, updates);
  await blog.save();

  sendSuccess(res, { message: 'Blog post updated', data: blog });
});

// DELETE /api/blogs/:id
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new ApiError(404, 'Blog post not found.');
  sendSuccess(res, { message: 'Blog post deleted' });
});

module.exports = { getBlogs, getBlogBySlug, getBlogCategories, createBlog, updateBlog, deleteBlog };
