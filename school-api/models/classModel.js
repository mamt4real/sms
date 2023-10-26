const mongoose = require('mongoose')

const classSchema = mongoose.Schema(
  {
    class: {
      type: String,
      unique: [true, 'A Class should have a unique name'],
      required: [true, 'You must provide a name for the class'],
    },
    master: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      unique: [true, 'A Teacher can not have two classes'],
    },
    block: String,
    subjects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

classSchema.virtual('students', {
  ref: 'Student',
  localField: '_id',
  foreignField: 'classID',
})

classSchema.virtual('noOfStudents').get(function () {
  if (this.students) return this.students.length
})

classSchema.pre(/^findOne/, function (next) {
  this.populate('master', 'fname mname surname')
  return next()
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class
