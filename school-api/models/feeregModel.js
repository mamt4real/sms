const mongoose = require('mongoose')
const MyError = require('../utils/myError')
const Section = require('./sectionModel')

const feeregSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
      required: [true, 'Please provide Students ID'],
      unique: false,
    },
    fee: {
      type: mongoose.Schema.ObjectId,
      ref: 'Fee',
      unique: false,
    },
    section: {
      type: mongoose.Schema.ObjectId,
      ref: 'Section',
      unique: false,
      required: [true, 'Please provide Students ID'],
    },
    class: {
      type: mongoose.Schema.ObjectId,
      ref: 'Class',
    },
    amount: {
      type: Number,
      required: [true, 'Please provide the amount of the Fee'],
    },
    paid: {
      type: Number,
      default: 0,
    },
    paymentRef: String,
    pMethod: {
      type: String,
      set: function (val) {
        return val.toLowerCase()
      },
      get: function (val) {
        return val.toUpperCase()
      },
      enum: {
        values: ['cash', 'bank', 'online'],
        message: 'method should be one of cash,bank or online!',
      },
    },
    datePaid: {
      type: Date,
      default: Date(),
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

feeregSchema.index({ student: 1, fee: 1, section: 1 }, { unique: true })

feeregSchema.virtual('balance').get(function () {
  return this.amount - this.paid
})

feeregSchema.virtual('status').get(function () {
  if (this.balance == this.amount) return 'Not Paid'
  else if (this.balance <= 0) return 'Paid'
  else return 'Deposit'
})

feeregSchema.pre(/^find/, function (next) {
  this.populate('student', 'fname mname surname gender passport')
    .populate('fee')
    .populate('class', 'class')
    .populate('section', 'term session')
  next()
})

feeregSchema.statics.registerFee = async (students, fee, amount, section) => {
  section = section || (await Section.getActive())
  students.forEach((student) => {
    FeeReg.create({
      student: student._id,
      class: student.classID,
      fee,
      section,
      amount,
    })
      .then((doc) => {
        // console.log(doc);
      })
      .catch((error) => {
        if (error.code === 11000) {
          console.log('fee already registered!!!!!!')
          FeeReg.updateOne(
            { student: student._id, fee, section },
            { amount }
          ).then()
        } else {
          console.log(error)
          throw new MyError('Error registering fee', 500)
        }
      })
  })
}

const FeeReg = mongoose.model('FeeReg', feeregSchema)
module.exports = FeeReg
