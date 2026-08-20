const Review = require('../models/Review');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('../utils/apiResponse');

// GET /api/reviews  (public - approved only)
const getApprovedReviews = asyncHandler(async (_req, res) => {
  const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
  sendSuccess(res, { data: reviews });
});

// GET /api/reviews/admin/all  (admin - everything)
const getAllReviews = asyncHandler(async (_req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  sendSuccess(res, { data: reviews });
});

// POST /api/reviews  (admin)
const createReview = asyncHandler(async (req, res) => {
  const { clientName, reviewText } = req.body;
  if (!clientName || !reviewText) throw new ApiError(400, 'clientName and reviewText are required.');

  const review = await Review.create(req.body);
  sendSuccess(res, { statusCode: 201, message: 'Review created', data: review });
});

// PUT /api/reviews/:id  (admin)
const updateReview = asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  delete updates.id;

  const review = await Review.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
  if (!review) throw new ApiError(404, 'Review not found.');
  sendSuccess(res, { message: 'Review updated', data: review });
});

// DELETE /api/reviews/:id  (admin)
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw new ApiError(404, 'Review not found.');
  sendSuccess(res, { message: 'Review deleted' });
});

module.exports = { getApprovedReviews, getAllReviews, createReview, updateReview, deleteReview };
