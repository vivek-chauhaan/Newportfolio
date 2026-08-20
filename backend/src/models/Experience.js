const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    currentlyWorking: { type: Boolean, default: false },
    description: { type: String, default: '' },
    achievements: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('Experience', experienceSchema);
