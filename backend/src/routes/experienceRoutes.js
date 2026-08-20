const createSimpleListRouter = require('./simpleListRouterFactory');
const controller = require('../controllers/experienceController');

module.exports = createSimpleListRouter(controller);
