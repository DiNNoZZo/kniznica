const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const HttpError = require('./utils/http-error');
const globalErrorHandler = require('./controllers/error-controller');
const booksRouter = require('./routes/books-routes');
const librariesRouter = require('./routes/libraries-routes');
const studentsRouter = require('./routes/students-routes');
const historyRouter = require('./routes/history-routes');

const app = express();

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/books', booksRouter);
app.use('/api/libraries', librariesRouter);
app.use('/api/students', studentsRouter);
app.use('/api/history', historyRouter);

app.all('*', (req, res, next) => {
  next(new HttpError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
});
