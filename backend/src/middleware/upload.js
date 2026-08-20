const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const ApiError = require('../utils/ApiError');

const UPLOAD_ROOT = path.join(__dirname, '..', '..', 'uploads');

// Allowed `:type` route params map to a subdirectory and an allowed set of
// mimetypes. `resume` additionally allows PDFs.
const TYPE_CONFIG = {
  profile: { dir: 'profile', mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] },
  resume: { dir: 'resume', mimes: ['application/pdf', 'image/jpeg', 'image/png'] },
  projects: { dir: 'projects', mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] },
  blogs: { dir: 'blogs', mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] },
  reviews: { dir: 'reviews', mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] },
  certifications: { dir: 'certifications', mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'] },
  misc: { dir: 'misc', mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'] },
};

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const config = TYPE_CONFIG[req.params.type];
    if (!config) return cb(new ApiError(400, `Unsupported upload type '${req.params.type}'`));
    cb(null, path.join(UPLOAD_ROOT, config.dir));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`;
    cb(null, unique);
  },
});

function fileFilter(req, file, cb) {
  const config = TYPE_CONFIG[req.params.type];
  if (!config) return cb(new ApiError(400, `Unsupported upload type '${req.params.type}'`));
  if (!config.mimes.includes(file.mimetype)) {
    return cb(new ApiError(400, `Invalid file type for '${req.params.type}'. Allowed: ${config.mimes.join(', ')}`));
  }
  cb(null, true);
}

const maxSizeMb = Number(process.env.MAX_UPLOAD_MB) || 5;

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSizeMb * 1024 * 1024, files: 1 },
});

module.exports = { upload, TYPE_CONFIG, UPLOAD_ROOT };
