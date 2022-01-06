const express = require('express');
const booksController = require('../controllers/books-controller');

const router = express.Router();

router
  .route('/')
  .get(booksController.getAllBooks)
  .post(booksController.createBook);

router
  .route('/:id')
  .get(booksController.getBook)
  .delete(booksController.deleteBook)
  .patch(booksController.updateBook);

router
  .route('/:bookId/:studentId')
  .post(booksController.addReader)
  .delete(booksController.returnBook);

module.exports = router;
