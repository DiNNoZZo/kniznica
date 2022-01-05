const mongoose = require('mongoose');

const historySchema = mongoose.Schema(
  {
    take: {
      type: Date,
      default: Date.now(),
    },
    maxDays: {
      type: Date,
      require: [true, 'Scheduled return time.'],
    },
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
      require: [true, 'The book does not go away on its own.'],
    },
    book: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
      require: [true, 'Nothing can be borrowed.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

historySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'student',
    select: 'name email id -reading -library',
  }).populate({
    path: 'book',
    select: 'writer name pages id -reader -library',
  });

  next();
});

const History = mongoose.model('History', historySchema);

module.exports = History;
