const HttpError = require('../utils/http-error');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new HttpError(message, 400);
};

const handleDublicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue).map((value) => value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new HttpError(message, 404);
};

const handleValidationErrorDB = (err) => {
  const error = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${error.join('. ')}`;

  return new HttpError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //programing error
    res.status(500).json({
      status: 'error',
      message: 'Somthing went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { message: err.message, ...err };

    if (err.name === 'CastError') error = handleCastErrorDB(error);

    if (err.code === 11000) error = handleDublicateFieldsDB(error);

    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
