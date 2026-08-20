const About = require('../models/About');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');

// About is a singleton: there is exactly one document, created lazily.
async function getOrCreateAbout() {
  let about = await About.findOne();
  if (!about) about = await About.create({});
  return about;
}

// GET /api/about
const getAbout = asyncHandler(async (_req, res) => {
  const about = await getOrCreateAbout();
  sendSuccess(res, { data: about });
});

// PUT /api/about
const updateAbout = asyncHandler(async (req, res) => {
  const about = await getOrCreateAbout();

  const allowedFields = [
    'fullName', 'designation', 'greeting', 'description',
    'yearsOfExperience', 'projectsCompleted', 'happyClients',
    'photoUrl', 'resumeUrl', 'email', 'phone', 'address',
  ];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) about[field] = req.body[field];
  });

  await about.save();
  sendSuccess(res, { message: 'About section updated', data: about });
});

module.exports = { getAbout, updateAbout };
