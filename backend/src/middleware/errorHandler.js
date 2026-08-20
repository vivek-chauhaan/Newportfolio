const multer = require('multer');
const ApiError = require('../utils/ApiError');

function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors;

  // Mongoose validation errors -> 400 with field-level details
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => e.message);
    message = 'Validation failed';
  }

  // Mongoose bad ObjectId cast -> 400
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for '${err.path}'`;
  }

  // Duplicate key error -> 409
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} already exists` : 'Duplicate value';
  }

  // Multer upload errors -> 400
  if (err instanceof multer.MulterError) {
    statusCode = 400;
    message = err.message;
  }

  if (statusCode >= 500) {
    console.error('[error]', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
  });
}

module.exports = { notFound, errorHandler };
