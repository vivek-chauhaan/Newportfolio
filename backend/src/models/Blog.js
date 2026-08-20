const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    coverImage: { type: String, default: '' },
    description: { type: String, trim: true, default: '' },
    content: { type: String, required: true },
    // The admin form sends a free-text "categoryId" which we store here as
    // the category label itself (there is no separate category-management
    // screen in the frontend), keeping /blogs/categories/all driven by the
    // distinct values actually in use.
    category: { type: String, trim: true, default: '' },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
    readingTime: { type: String, default: '5 min read' },
  },
  { timestamps: true }
);

blogSchema.index({ title: 'text', description: 'text', content: 'text', category: 'text' });

blogSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('Blog', blogSchema);
