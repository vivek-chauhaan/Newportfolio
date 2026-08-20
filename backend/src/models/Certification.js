const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    issueDate: { type: Date, default: null },
    credentialUrl: { type: String, trim: true, default: '' },
    imageUrl: { type: String, trim: true, default: '' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

certificationSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('Certification', certificationSchema);
