const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
      trim: true,
      minlength: [2, 'Library name must be more or equal than 2 characters.'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Query middleware
librarySchema.virtual('students', {
  ref: 'Student',
  foreignField: 'library',
  localField: '_id',
});

librarySchema.virtual('books', {
  ref: 'Book',
  foreignField: 'library',
  localField: '_id',
});

librarySchema.pre(/^find/, function (next) {
  this.find({ active: true });

  next();
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
