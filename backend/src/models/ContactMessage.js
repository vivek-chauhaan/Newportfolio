const mongoose = require('mongoose');
const toJSONPlugin = require('../utils/toJSONPlugin');

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactMessageSchema.plugin(toJSONPlugin);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
