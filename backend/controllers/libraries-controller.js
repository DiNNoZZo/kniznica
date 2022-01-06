const Libraries = require('../models/library-model');
const HttpError = require('../utils/http-error');
const catchAsync = require('../utils/catch-async');

exports.getAllLibraries = catchAsync(async (req, res, next) => {
  const allLibraries = await Libraries.find().populate('books students');

  res.status(200).json({
    status: 'success',
    results: allLibraries.length,
    data: allLibraries,
  });
});

exports.getLibrary = catchAsync(async (req, res, next) => {
  const library = await Libraries.findById(req.params.id).populate(
    'books students'
  );

  if (!library) {
    return next(new HttpError('No library found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: library });
});

exports.createLibrary = catchAsync(async (req, res, next) => {
  const library = await Libraries.create(req.body);

  if (!library) {
    return next(new HttpError('No library found with that ID', 404));
  }

  res.status(201).json({ status: 'success', data: library });
});

exports.updateLibrary = catchAsync(async (req, res, next) => {
  const library = await Libraries.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!library) {
    return next(new HttpError('No library found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: library });
});

exports.deleteLibrary = catchAsync(async (req, res, next) => {
  //delete library (just change visibility)
  const library = await Libraries.findByIdAndUpdate(req.params.id, {
    active: false,
  });

  if (!library) {
    return next(new HttpError('No library found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: null });
});
