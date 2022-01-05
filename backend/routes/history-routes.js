const express = require('express');
const historyController = require('../controllers/history-controller');

const router = express.Router();

router
  .route('/')
  .get(historyController.getAllHistory)
  .post(historyController.createHistory);

module.exports = router;
