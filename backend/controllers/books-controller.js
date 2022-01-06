const HttpError = require('../utils/http-error');
const catchAsync = require('../utils/catch-async');

const Book = require('../models/book-model');
const History = require('../models/history-model');
const Student = require('../models/student-model');

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const allBooks = await Book.find();

  res.status(200).json({ status: 'success', data: allBooks });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate('history');

  if (!book) {
    return next(new HttpError('No book found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: book });
});

exports.createBook = catchAsync(async (req, res, next) => {
  const book = await Book.create(req.body);

  res.status(201).json({ status: 'success', data: book });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      writer: req.body.writer,
      name: req.body.name,
      pages: req.body.pages,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!book) {
    return next(new HttpError('No book found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: book });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const checkBook = await Book.findById(req.params.id);

  if (checkBook.reader.active) {
    const err = new HttpError("I can't delete a book a student has.", 404);
    return next(err);
  }

  //delete book (just change visibility)
  const book = await Book.findByIdAndUpdate(req.params.id, { active: false });

  if (!book) {
    return next(new HttpError('No book found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: null });
});

exports.addReader = catchAsync(async (req, res, next) => {
  const book = await Book.findOneAndUpdate(
    { _id: req.params.bookId },
    {
      $set: {
        reader: {
          student: req.params.studentId,
          maxDays: req.body.maxDays,
          active: true,
        },
      },
    },
    { returnDocument: 'after' }
  );

  await History.create(req.body);

  const student = await Student.findOneAndUpdate(
    { _id: req.params.studentId },
    {
      $set: {
        reading: { book: req.params.bookId, active: true },
      },
    }
  );

  if (!book || !student) {
    return next(
      new HttpError('No book or student with this ID was found.', 404)
    );
  }

  res.status(200).json({ status: 'success', data: null });
});

exports.returnBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(
    { _id: req.params.bookId },
    {
      $set: { reader: { active: false } },
    }
  );

  const student = await Student.findOneAndUpdate(
    { _id: req.params.studentId },
    {
      $set: { reading: { active: false } },
    }
  );

  if (!book || !student) {
    return next(
      new HttpError('No book or student with this ID was found.', 404)
    );
  }
  res.status(200).json({ status: 'success', data: null });
});
