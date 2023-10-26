const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      unique: [true, 'A Subject should have a unique name'],
      required: [true, 'You must provide a subject title'],
    },
    section: {
      type: String,
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

subjectSchema.virtual('groupings', {
  ref: 'TeachSub',
  localField: '_id',
  foreignField: 'subject',
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject
