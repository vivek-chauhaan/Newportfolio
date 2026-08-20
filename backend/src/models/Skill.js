const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillCategory', required: true, index: true },
    proficiency: { type: Number, min: 0, max: 100, default: 70 },
    icon: { type: String, trim: true, default: '' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ name: 'text' });

skillSchema.plugin(toJSONPlugin);

// Compatibility: the frontend's SkillCard reads `skill.iconUrl` and
// `skill.categoryName`, while the admin form/API use `icon` /
// `categoryId`. We mirror those values on serialization so both places
// work without touching the existing frontend.
skillSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    ret.iconUrl = ret.icon || '';
    if (ret.categoryId && typeof ret.categoryId === 'object' && ret.categoryId.name) {
      ret.categoryName = ret.categoryId.name;
      ret.categoryId = ret.categoryId._id?.toString() || ret.categoryId.id;
    }
    return ret;
  },
});

module.exports = mongoose.model('Skill', skillSchema);
