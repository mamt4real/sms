const mongoose = require('mongoose')

const teachSubSchema = mongoose.Schema({
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'This teacher is required'],
    unique: false,
  },
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subject',
    required: [true, 'This subject is required'],
    unique: false,
  },
  class: {
    type: mongoose.Schema.ObjectId,
    ref: 'Class',
    required: [true, 'This class is required'],
    unique: false,
  },
})

teachSubSchema.index({ teacher: 1, subject: 1, class: 1 }, { unique: true })

teachSubSchema.pre(/^find/, function (next) {
  this.populate('teacher', 'fname mname surname')
    .populate('subject', 'subject')
    .populate('class', 'class')
  next()
})

const TeachSub = mongoose.model('TeachSub', teachSubSchema)
module.exports = TeachSub
