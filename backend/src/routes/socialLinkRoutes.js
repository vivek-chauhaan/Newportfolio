const createSimpleListRouter = require('./simpleListRouterFactory');
const controller = require('../controllers/socialLinkController');

module.exports = createSimpleListRouter(controller);
