const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { TYPE_CONFIG } = require('../middleware/upload');

// POST /api/upload/:type  (admin, multipart/form-data field "file")
const uploadFile = asyncHandler(async (req, res) => {
  if (!TYPE_CONFIG[req.params.type]) throw new ApiError(400, `Unsupported upload type '${req.params.type}'`);
  if (!req.file) throw new ApiError(400, 'No file was uploaded. Attach a file under the "file" field.');

  const { dir } = TYPE_CONFIG[req.params.type];
  const filePath = `/uploads/${dir}/${req.file.filename}`;
  const publicBase = process.env.SERVER_PUBLIC_URL || '';

  sendSuccess(res, {
    statusCode: 201,
    message: 'File uploaded',
    data: {
      filePath: `${publicBase}${filePath}`,
      relativePath: filePath,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
});

module.exports = { uploadFile };
