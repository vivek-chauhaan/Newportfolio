const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const settingsSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, trim: true, default: 'Portfolio' },
    siteTagline: { type: String, trim: true, default: '' },
    metaDescription: { type: String, default: '' },
    favicon: { type: String, default: '' },
    defaultTheme: { type: String, enum: ['dark', 'light'], default: 'dark' },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

settingsSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('Settings', settingsSchema);
