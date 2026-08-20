const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendSuccess, paginate } = require('../utils/apiResponse');

// POST /api/contact  (public)
const submitContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) throw new ApiError(400, 'name, email and message are required.');

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(email)) throw new ApiError(400, 'Please provide a valid email address.');

  await ContactMessage.create(req.body);
  sendSuccess(res, { statusCode: 201, message: "Message sent! I'll get back to you soon." });
});

// GET /api/admin/contact-messages?page=&size=  (admin)
const getContactMessages = asyncHandler(async (req, res) => {
  const page = Math.max(0, parseInt(req.query.page, 10) || 0);
  const size = Math.min(100, Math.max(1, parseInt(req.query.size, 10) || 20));

  const [items, totalElements] = await Promise.all([
    ContactMessage.find().sort({ createdAt: -1 }).skip(page * size).limit(size),
    ContactMessage.countDocuments(),
  ]);

  sendSuccess(res, { data: paginate({ items, totalElements, page, size }) });
});

// PATCH /api/admin/contact-messages/:id/read  (admin)
const markAsRead = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { $set: { read: true } }, { new: true });
  if (!msg) throw new ApiError(404, 'Message not found.');
  sendSuccess(res, { message: 'Marked as read', data: msg });
});

// DELETE /api/admin/contact-messages/:id  (admin)
const deleteContactMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) throw new ApiError(404, 'Message not found.');
  sendSuccess(res, { message: 'Message deleted' });
});

module.exports = { submitContactMessage, getContactMessages, markAsRead, deleteContactMessage };
