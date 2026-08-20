/**
 * Consistent success envelope used across the whole API:
 *   { success: true, message, data }
 *
 * The frontend's axios service layer reads `response.data.data` (or, for
 * simple mutations, the whole `response.data`), so every endpoint must
 * return this shape.
 */
function sendSuccess(res, { statusCode = 200, message = 'Success', data = null } = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Builds the paginated "content" shape expected by the frontend
 * (projects, blogs, contact messages): { content, totalElements, totalPages, page, size }
 */
function paginate({ items, totalElements, page, size }) {
  return {
    content: items,
    totalElements,
    totalPages: Math.max(1, Math.ceil(totalElements / size)),
    page,
    size,
  };
}

module.exports = { sendSuccess, paginate };
