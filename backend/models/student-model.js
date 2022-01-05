const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Yours name is required.'],
      minlength: [2, 'Name must be more or equal than 2 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    library: {
      type: mongoose.Schema.ObjectId,
      ref: 'Library',
      required: [true, 'The student must have a library.'],
    },
    reading: {
      book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
      },
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

studentSchema.virtual('history', {
  ref: 'History',
  foreignField: 'student',
  localField: '_id',
});

studentSchema.pre(/^find/, function (next) {
  this.populate({ path: 'library', select: 'name id' }).populate({
    path: 'reading',
    populate: {
      path: 'book',
      select: 'writer name pages -reader -library',
    },
  });

  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
