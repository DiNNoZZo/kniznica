const express = require('express');
const librariesController = require('../controllers/libraries-controller');

const router = express.Router();

router
  .route('/')
  .get(librariesController.getAllLibraries)
  .post(librariesController.createLibrary);
router
  .route('/:id')
  .get(librariesController.getLibrary)
  .patch(librariesController.updateLibrary)
  .delete(librariesController.deleteLibrary);

module.exports = router;
