const Settings = require('../models/Settings');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');

async function getOrCreateSettings() {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return settings;
}

// GET /api/settings
const getSettings = asyncHandler(async (_req, res) => {
  const settings = await getOrCreateSettings();
  sendSuccess(res, { data: settings });
});

// PUT /api/settings
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  const allowedFields = ['siteTitle', 'siteTagline', 'metaDescription', 'favicon', 'defaultTheme', 'maintenanceMode'];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) settings[field] = req.body[field];
  });

  await settings.save();
  sendSuccess(res, { message: 'Settings updated', data: settings });
});

module.exports = { getSettings, updateSettings };
