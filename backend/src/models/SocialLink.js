const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    icon: { type: String, trim: true, default: '' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

socialLinkSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('SocialLink', socialLinkSchema);
