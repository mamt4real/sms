const mongoose = require('mongoose')
const Section = require('./sectionModel')

const feeSchema = mongoose.Schema(
  {
    feeName: {
      type: String,
      unique: [true, 'Fee Already Exist!!!'],
    },
    section: {
      type: String,
      default: 'GENERAL',
      set: function (val) {
        return val.toUpperCase()
      },
      enum: {
        values: ['SENIOR', 'JUNIOR', 'PRIMARY', 'NURSERY', 'GENERAL'],
        message:
          'section should be one of (senior,junior,primary,nursery,general)',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

feeSchema.virtual('payments', {
  localField: '_id',
  foreignField: 'fee',
  ref: 'FeeReg',
})

const Fee = mongoose.model('Fee', feeSchema)
module.exports = Fee
