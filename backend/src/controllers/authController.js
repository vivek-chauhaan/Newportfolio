const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/apiResponse');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/tokens');

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, 'Email and password are required.');

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!admin) throw new ApiError(401, 'Invalid email or password.');

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid email or password.');

  const accessToken = signAccessToken(admin);
  const refreshToken = signRefreshToken(admin);

  admin.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await admin.save();

  sendSuccess(res, {
    message: 'Login successful',
    data: {
      accessToken,
      refreshToken,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

// POST /api/auth/refresh
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new ApiError(400, 'refreshToken is required.');

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, 'Refresh token expired or invalid. Please log in again.');
  }

  const admin = await Admin.findById(payload.sub).select('+refreshTokenHash');
  if (!admin || !admin.refreshTokenHash) throw new ApiError(401, 'Session no longer valid. Please log in again.');

  const isValid = await bcrypt.compare(refreshToken, admin.refreshTokenHash);
  if (!isValid) throw new ApiError(401, 'Session no longer valid. Please log in again.');

  const newAccessToken = signAccessToken(admin);
  const newRefreshToken = signRefreshToken(admin);
  admin.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
  await admin.save();

  sendSuccess(res, {
    message: 'Token refreshed',
    data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
  });
});

module.exports = { login, refresh };
