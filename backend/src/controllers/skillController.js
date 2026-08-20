const Skill = require('../models/Skill');
const SkillCategory = require('../models/SkillCategory');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/apiResponse');

// ---- Skills ----

// GET /api/skills?search=
const getSkills = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: search, $options: 'i' };

  const skills = await Skill.find(filter)
    .populate('categoryId', 'name')
    .sort({ displayOrder: 1, name: 1 });

  sendSuccess(res, { data: skills });
});

// POST /api/skills
const createSkill = asyncHandler(async (req, res) => {
  const { name, categoryId, proficiency, icon, displayOrder } = req.body;
  if (!name || !categoryId) throw new ApiError(400, 'name and categoryId are required.');

  const category = await SkillCategory.findById(categoryId);
  if (!category) throw new ApiError(400, 'Invalid categoryId - category does not exist.');

  const skill = await Skill.create({ name, categoryId, proficiency, icon, displayOrder });
  await skill.populate('categoryId', 'name');

  sendSuccess(res, { statusCode: 201, message: 'Skill created', data: skill });
});

// PUT /api/skills/:id
const updateSkill = asyncHandler(async (req, res) => {
  const { name, categoryId, proficiency, icon, displayOrder } = req.body;

  if (categoryId) {
    const category = await SkillCategory.findById(categoryId);
    if (!category) throw new ApiError(400, 'Invalid categoryId - category does not exist.');
  }

  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    { $set: { name, categoryId, proficiency, icon, displayOrder } },
    { new: true, runValidators: true, omitUndefined: true }
  ).populate('categoryId', 'name');

  if (!skill) throw new ApiError(404, 'Skill not found.');
  sendSuccess(res, { message: 'Skill updated', data: skill });
});

// DELETE /api/skills/:id
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new ApiError(404, 'Skill not found.');
  sendSuccess(res, { message: 'Skill deleted' });
});

// ---- Skill Categories ----

// GET /api/skill-categories
const getSkillCategories = asyncHandler(async (_req, res) => {
  const categories = await SkillCategory.find().sort({ displayOrder: 1, name: 1 });
  sendSuccess(res, { data: categories });
});

// POST /api/skill-categories
const createSkillCategory = asyncHandler(async (req, res) => {
  const { name, icon, displayOrder } = req.body;
  if (!name) throw new ApiError(400, 'name is required.');

  const category = await SkillCategory.create({ name, icon, displayOrder });
  sendSuccess(res, { statusCode: 201, message: 'Category created', data: category });
});

// PUT /api/skill-categories/:id
const updateSkillCategory = asyncHandler(async (req, res) => {
  const { name, icon, displayOrder } = req.body;
  const category = await SkillCategory.findByIdAndUpdate(
    req.params.id,
    { $set: { name, icon, displayOrder } },
    { new: true, runValidators: true, omitUndefined: true }
  );
  if (!category) throw new ApiError(404, 'Category not found.');
  sendSuccess(res, { message: 'Category updated', data: category });
});

// DELETE /api/skill-categories/:id
const deleteSkillCategory = asyncHandler(async (req, res) => {
  const inUse = await Skill.exists({ categoryId: req.params.id });
  if (inUse) throw new ApiError(409, 'Cannot delete a category that still has skills assigned to it.');

  const category = await SkillCategory.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found.');
  sendSuccess(res, { message: 'Category deleted' });
});

module.exports = {
  getSkills, createSkill, updateSkill, deleteSkill,
  getSkillCategories, createSkillCategory, updateSkillCategory, deleteSkillCategory,
};
