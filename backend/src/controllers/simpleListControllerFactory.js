const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/apiResponse');

/**
 * Builds a standard { getAll, create, update, remove } controller set for
 * simple, non-paginated, admin-managed lists (Experience, Education,
 * Certifications) that all share the same shape of interaction.
 *
 * @param {import('mongoose').Model} Model
 * @param {string} entityName human-readable name used in messages
 * @param {string[]} requiredFields fields that must be present on create
 */
function createSimpleListController(Model, entityName, requiredFields = []) {
  const getAll = asyncHandler(async (_req, res) => {
    const items = await Model.find().sort({ displayOrder: 1, createdAt: -1 });
    sendSuccess(res, { data: items });
  });

  const create = asyncHandler(async (req, res) => {
    const missing = requiredFields.filter((f) => !req.body[f]);
    if (missing.length) throw new ApiError(400, `${missing.join(', ')} ${missing.length > 1 ? 'are' : 'is'} required.`);

    const item = await Model.create(req.body);
    sendSuccess(res, { statusCode: 201, message: `${entityName} created`, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const updates = { ...req.body };
    delete updates.id;

    const item = await Model.findByIdAndUpdate(req.params.id, { $set: updates }, {
      new: true,
      runValidators: true,
    });
    if (!item) throw new ApiError(404, `${entityName} not found.`);
    sendSuccess(res, { message: `${entityName} updated`, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, `${entityName} not found.`);
    sendSuccess(res, { message: `${entityName} deleted` });
  });

  return { getAll, create, update, remove };
}

module.exports = createSimpleListController;
