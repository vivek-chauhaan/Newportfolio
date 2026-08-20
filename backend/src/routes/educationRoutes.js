const createSimpleListRouter = require('./simpleListRouterFactory');
const controller = require('../controllers/educationController');

module.exports = createSimpleListRouter(controller);
