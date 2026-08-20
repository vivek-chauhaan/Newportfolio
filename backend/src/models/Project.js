const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, trim: true, default: '' },
    description: { type: String, default: '' },
    thumbnailImage: { type: String, default: '' },
    images: { type: [String], default: [] },
    category: { type: String, trim: true, default: '' },
    technologies: { type: [String], default: [] },
    githubUrl: { type: String, trim: true, default: '' },
    liveDemoUrl: { type: String, trim: true, default: '' },
    problemStatement: { type: String, default: '' },
    solutionOverview: { type: String, default: '' },
    systemArchitecture: { type: String, default: '' },
    keyOutcomes: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', shortDescription: 'text', description: 'text', category: 'text' });

projectSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('Project', projectSchema);
