const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

// Singleton document (there's only ever one "About" record for the site).
const aboutSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, default: '' },
    designation: { type: String, trim: true, default: '' },
    greeting: { type: String, trim: true, default: '' },
    description: { type: String, default: '' },
    yearsOfExperience: { type: Number, default: 0, min: 0 },
    projectsCompleted: { type: Number, default: 0, min: 0 },
    happyClients: { type: Number, default: 0, min: 0 },
    photoUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    email: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

aboutSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('About', aboutSchema);
