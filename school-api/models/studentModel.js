const mongoose = require('mongoose')
const Class = require('./classModel')
const Subreg = require('./subregModel')

const studentSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, 'A student must have a FirstName'],
      trim: true,
    },
    surname: {
      type: String,
      required: [true, 'A student must have a Surname'],
      trim: true,
    },
    mname: {
      type: String,
      trim: true,
    },
    classID: {
      type: mongoose.Schema.ObjectId,
      ref: 'Class',
      required: [true, 'A student must belong to a class'],
    },
    regno: {
      type: String,
      unique: [true, 'Registration Number Already Exist'],
    },
    regyear: String,
    gender: {
      type: String,
      enum: {
        values: [
          'MALE',
          'FEMALE',
          'OTHERS',
          'Male',
          'Female',
          'Others',
          'male',
          'female',
          'others',
        ],
        message: 'gender is either MALE, FEMALE or OTHERS',
      },
    },
    passport: {
      type: String,
      default: 'default.jpg',
    },
    dob: Date,
    registrationDate: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    acitve: {
      type: Boolean,
      default: true,
    },
    guardian: {
      name: {
        type: String,
        required: [true, 'Please provide a name'],
      },
      relationship: {
        type: String,
        required: [
          true,
          "Please identify the guardian's relationship with the Student!",
        ],
      },
      phoneNo: {
        type: String,
        required: [true, "Please provide the guardian's phone number"],
      },
      email: {
        type: String,
      },
    },
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

studentSchema.virtual('name').get(function () {
  // console.log(this)
  return `${this.fname} ${this.mname || ''} ${this.surname}`
})

studentSchema.virtual('payments', {
  localField: '_id',
  foreignField: 'student',
  ref: 'FeeReg',
  fields: 'fee section amount paid',
})

studentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
    .populate('classID', 'class')
    .sort('classID -gender name')
  next()
})

studentSchema.statics.registerSubjects = async (student) => {
  const cls = await Class.findById(student.classID)
  for (const subj of cls.subjects) {
    await Subreg.addRecord([student], subj)
  }
}

studentSchema.pre('save', async function (next) {
  if (!this.isNew) return next()
  await Student.registerSubjects(this)
  next()
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student
