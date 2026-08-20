const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const reviewSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: '' },
    clientImage: { type: String, trim: true, default: '' },
    reviewText: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reviewSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('Review', reviewSchema);
