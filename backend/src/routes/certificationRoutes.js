const createSimpleListRouter = require('./simpleListRouterFactory');
const controller = require('../controllers/certificationController');

module.exports = createSimpleListRouter(controller);
