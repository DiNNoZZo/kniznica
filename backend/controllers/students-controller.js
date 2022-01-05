const HttpError = require('../utils/http-error');
const Student = require('../models/student-model');
const catchAsync = require('../utils/catch-async');

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const allStudents = await Student.find();

  res.status(200).json({ status: 'success', data: allStudents });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id).populate('history');

  if (!student) {
    return next(new HttpError('No student found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: student });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const student = await Student.create(req.body);

  res.status(201).json({ status: 'success', data: student });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!student) {
    return next(new HttpError('No student found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: student });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const checkStudent = await Student.findById(req.params.id);

  if (checkStudent.reading.active) {
    return next(new HttpError("I can't delete a student who has a book.", 500));
  }

  const student = await Student.findByIdAndRemove(req.params.id);

  if (!student) {
    return next(new HttpError('No student found with that ID', 404));
  }

  res.status(200).json({ status: 'success', data: null });
});
