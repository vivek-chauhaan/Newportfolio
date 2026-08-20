const express = require('express');
const { protect } = require('../middleware/auth');

// Builds standard GET(all)/POST/PUT/DELETE routes for a simple-list
// controller produced by simpleListControllerFactory.
function createSimpleListRouter({ getAll, create, update, remove }) {
  const router = express.Router();

  router.get('/', getAll);
  router.post('/', protect, create);
  router.put('/:id', protect, update);
  router.delete('/:id', protect, remove);

  return router;
}

module.exports = createSimpleListRouter;
