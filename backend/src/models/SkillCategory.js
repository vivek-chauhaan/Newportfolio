const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const skillCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    icon: { type: String, trim: true, default: '' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillCategorySchema.plugin(toJSONPlugin);

module.exports = mongoose.model('SkillCategory', skillCategorySchema);
