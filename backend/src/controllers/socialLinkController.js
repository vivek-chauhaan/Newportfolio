const SocialLink = require('../models/SocialLink');
const createSimpleListController = require('./simpleListControllerFactory');

module.exports = createSimpleListController(SocialLink, 'Social link', ['platform', 'url']);
