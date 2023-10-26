const mongoose = require('mongoose')
const { getGrade, getRemark } = require('../utils/gradeRemark')
const MyError = require('../utils/myError')
const Section = require('./sectionModel')

const subregSchema = mongoose.Schema(
  {
    studentID: {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
      required: [true, 'You must pass the student id'],
      unique: false,
    },
    classID: {
      type: mongoose.Schema.ObjectId,
      ref: 'Class',
      required: [true, 'You must pass the class id'],
    },
    subjectID: {
      type: mongoose.Schema.ObjectId,
      ref: 'Subject',
      required: [true, 'You must pass the subject id'],
      unique: false,
    },
    section: {
      type: mongoose.Schema.ObjectId,
      ref: 'Section',
      required: [true, 'Please provide the section ID'],
      unique: false,
    },
    fstCa: {
      type: Number,
      default: 0,
      min: [0, 'Score can not be negative'],
    },
    scnCa: {
      type: Number,
      default: 0,
      min: [0, 'Score can not be negative'],
    },
    exam: {
      type: Number,
      default: 0,
      min: [0, 'Score can not be negative'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

//each student can only registe a subject once in a term
subregSchema.index({ studentID: 1, subjectID: 1, section: 1 }, { unique: true })

subregSchema.pre('save', function (next) {
  this.total = this.fstCa + this.scnCa + this.exam
  next()
})

subregSchema.pre(/^find/, async function (next) {
  this.populate('studentID', 'fname mname surname gender')
    .populate('classID', 'class')
    .populate('section', 'session term')
    .populate('subjectID', 'subject')
    .sort('section classID student')
  next()
})

subregSchema
  .virtual('total', {
    type: Number,
    max: [100, 'Total score can not be above hundred'],
  })
  .get(function () {
    return this.fstCa + this.scnCa + this.exam
  })

subregSchema.virtual('grade').get(function () {
  return getGrade(this.total)
})

subregSchema.virtual('remark').get(function () {
  return getRemark(this.total)
})

subregSchema.statics.addRecord = async (students, subject) => {
  const section = await Section.findOne({ active: true })
  students.forEach((student) => {
    Subreg.create({
      studentID: student._id,
      classID: student.classID,
      subjectID: subject,
      section: section._id,
    })
      .then((doc) => {
        // console.log(doc)
      })
      .catch((error) => {
        if (error.code === 11000)
          console.log('subject already registered!!!!!!')
        else {
          console.log(error)
          throw new MyError('Error registering subject', 500)
        }
      })
  })
}

const Subreg = mongoose.model('Subreg', subregSchema)

module.exports = Subreg
