const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of the book is required.'],
      minlength: [
        2,
        'Name of the book must be more or equal than 2 characters.',
      ],
    },
    writer: {
      type: String,
      required: [true, 'Writer is required.'],
      minlength: [2, 'Writer name must be more or equal than 2 characters.'],
    },
    pages: {
      type: Number,
      required: [true, 'Page number is required.'],
      min: [1, 'The book must have several pages.'],
    },
    library: {
      type: mongoose.Schema.ObjectId,
      ref: 'Library',
      required: [true, 'The book must belong somewhere.'],
    },
    reader: {
      student: { type: mongoose.Schema.ObjectId, ref: 'Student' },
      active: {
        type: Boolean,
        required: [true, 'This field is required.'],
        default: false,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bookSchema.virtual('history', {
  ref: 'History',
  foreignField: 'book',
  localField: '_id',
});

bookSchema.pre(/^find/, function (next) {
  this.populate({ path: 'library', select: 'name id' }).populate({
    path: 'reader',
    populate: { path: 'student', select: 'name id email -reading -library' },
  });

  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
