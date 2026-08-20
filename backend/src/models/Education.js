const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    cgpa: { type: String, trim: true, default: '' },
    description: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

educationSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('Education', educationSchema);
