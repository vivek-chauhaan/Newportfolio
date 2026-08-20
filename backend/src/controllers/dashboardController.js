const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Blog = require('../models/Blog');
const Review = require('../models/Review');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certification = require('../models/Certification');
const ContactMessage = require('../models/ContactMessage');
const About = require('../models/About');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');

// GET /api/admin/dashboard/stats  (admin)
const getAdminStats = asyncHandler(async (_req, res) => {
  const [
    projects, skills, blogs, reviews, experience, education, certifications, contactMessages,
  ] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Blog.countDocuments(),
    Review.countDocuments(),
    Experience.countDocuments(),
    Education.countDocuments(),
    Certification.countDocuments(),
    ContactMessage.countDocuments(),
  ]);

  sendSuccess(res, {
    data: { projects, skills, blogs, reviews, experience, education, certifications, contactMessages },
  });
});

// GET /api/stats  (public - used for the homepage QuickStats counters)
const getPublicStats = asyncHandler(async (_req, res) => {
  const [about, projectsCompleted, technologiesMastered, certifications] = await Promise.all([
    About.findOne(),
    Project.countDocuments(),
    Skill.countDocuments(),
    Certification.countDocuments(),
  ]);

  sendSuccess(res, {
    data: {
      yearsOfExperience: about?.yearsOfExperience || 0,
      projectsCompleted: Math.max(about?.projectsCompleted || 0, projectsCompleted),
      technologiesMastered,
      certifications,
    },
  });
});

module.exports = { getAdminStats, getPublicStats };
