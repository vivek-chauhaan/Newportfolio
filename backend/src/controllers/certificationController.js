const Certification = require('../models/Certification');
const createSimpleListController = require('./simpleListControllerFactory');

module.exports = createSimpleListController(Certification, 'Certification', ['title', 'organization']);
