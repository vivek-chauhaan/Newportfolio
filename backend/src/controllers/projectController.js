const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendSuccess, paginate } = require('../utils/apiResponse');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

// GET /api/projects?search=&page=&size=
const getProjects = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const page = Math.max(0, parseInt(req.query.page, 10) || 0);
  const size = Math.min(100, Math.max(1, parseInt(req.query.size, 10) || 9));

  const filter = {};
  if (search) filter.$text = { $search: search };

  const [items, totalElements] = await Promise.all([
    Project.find(filter)
      .sort(search ? { score: { $meta: 'textScore' } } : { featured: -1, displayOrder: 1, createdAt: -1 })
      .skip(page * size)
      .limit(size),
    Project.countDocuments(filter),
  ]);

  sendSuccess(res, { data: paginate({ items, totalElements, page, size }) });
});

// GET /api/projects/:slug
const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) throw new ApiError(404, 'Project not found.');
  sendSuccess(res, { data: project });
});

// POST /api/projects
const createProject = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) throw new ApiError(400, 'title is required.');

  const slug = await generateUniqueSlug(Project, title);
  const project = await Project.create({ ...req.body, slug });

  sendSuccess(res, { statusCode: 201, message: 'Project created', data: project });
});

// PUT /api/projects/:id
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found.');

  const updates = { ...req.body };
  if (updates.title && updates.title !== project.title) {
    updates.slug = await generateUniqueSlug(Project, updates.title, project._id);
  }
  delete updates.id;

  Object.assign(project, updates);
  await project.save();

  sendSuccess(res, { message: 'Project updated', data: project });
});

// DELETE /api/projects/:id
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found.');
  sendSuccess(res, { message: 'Project deleted' });
});

// POST /api/projects/:id/images  { urls: string[] }  (also accepts a bare array body)
const addProjectImages = asyncHandler(async (req, res) => {
  const urls = Array.isArray(req.body) ? req.body : req.body.urls;
  if (!Array.isArray(urls) || urls.length === 0) throw new ApiError(400, 'Provide an array of image URLs.');

  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found.');

  project.images.push(...urls);
  await project.save();

  sendSuccess(res, { message: 'Images added', data: project });
});

module.exports = { getProjects, getProjectBySlug, createProject, updateProject, deleteProject, addProjectImages };
