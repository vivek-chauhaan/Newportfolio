const Education = require('../models/Education');
const createSimpleListController = require('./simpleListControllerFactory');

module.exports = createSimpleListController(Education, 'Education entry', ['institution', 'degree']);
