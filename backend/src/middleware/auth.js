const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Admin = require('../models/Admin');

function extractToken(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7);
  return null;
}

// Requires a valid access token. Attaches `req.user` (the Admin doc, minus
// password) and rejects with 401 otherwise.
const protect = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) throw new ApiError(401, 'Not authenticated. Please log in.');

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch {
    throw new ApiError(401, 'Session expired or invalid token. Please log in again.');
  }

  const admin = await Admin.findById(payload.sub);
  if (!admin) throw new ApiError(401, 'Account no longer exists.');

  req.user = admin;
  next();
});

// Best-effort auth: if a valid token is present, attaches req.user;
// otherwise continues as an anonymous request. Used for endpoints that
// behave differently for logged-in admins (e.g. blog drafts) without
// requiring authentication for public visitors.
const optionalAuth = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const admin = await Admin.findById(payload.sub);
    if (admin) req.user = admin;
  } catch {
    // Invalid/expired token on a public route -> just treat as anonymous.
  }
  next();
});

module.exports = { protect, optionalAuth };
