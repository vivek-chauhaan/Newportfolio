const Experience = require('../models/Experience');
const createSimpleListController = require('./simpleListControllerFactory');

module.exports = createSimpleListController(Experience, 'Experience entry', ['company', 'designation']);
