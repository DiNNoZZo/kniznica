const History = require('../models/history-model');
const catchAsync = require('../utils/catch-async');

exports.getAllHistory = catchAsync(async (req, res, next) => {
  const allHistory = await History.find();

  res.status(200).json({ status: 'success', data: allHistory });
});

exports.createHistory = catchAsync(async (req, res, next) => {
  const history = await History.create(req.body);

  res.status(200).json({ status: 'success', data: history });
});
