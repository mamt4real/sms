const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = mongoose.Schema(
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
    username: {
      type: String,
      required: [true, 'please provide a username'],
      unique: [true, 'username already exist'],
    },
    email: {
      type: String,
      required: [true, 'please provide an email'],
      unique: [true, 'email already exist'],
      validate: [validator.isEmail, 'please provide a valid email address'],
    },
    phone: String,
    password: {
      type: String,
      required: [true, 'please enter your password'],
      minLength: [8, 'a password sould be atleast 8 characters'],
      select: false,
    },
    image: {
      type: String,
      default: 'default.jpg',
    },
    confirmpass: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (val) {
          return this.password === val
        },
        message: 'Password Mismatch',
      },
    },
    qualification: {
      type: String,
    },
    appointmentDate: {
      type: Date,
      default: Date.now(),
    },
    level: {
      type: Number,
      default: 6,
    },
    gradeLevel: {
      type: Number,
      default: 1,
    },
    staffno: {
      type: String,
    },
    dob: {
      type: Date,
      default: Date(),
    },
    gender: String,
    clearance: {
      type: String,
      enum: {
        values: [
          'admin',
          'form master',
          'teacher',
          'exam officer',
          'accountant',
          'client',
        ],
        message: 'clearance should be one of admin/client',
      },
      default: 'client',
    },
    phone: String,
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: String,
    resetTokenExpiresAt: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.virtual('teachingSubs', {
  ref: 'TeachSub',
  localField: '_id',
  foreignField: 'teacher',
})

userSchema.virtual('name').get(function () {
  return `${this.fname} ${this.mname || ''} ${this.surname}`
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmpass = undefined
  next()
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next()
  }
  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

userSchema.methods.verifyPassword = function (candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changesPasswordAfter = function (tokenTimeStamp) {
  if (this.passwordChangedAt) {
    const lastPassChangedAt = parseInt(this.passwordChangedAt.getTime() / 1000)
    return tokenTimeStamp < lastPassChangedAt
  }
  return false
}

userSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  //token expires after 15 minutes
  this.resetTokenExpiresAt = Date.now() + 15 * 60 * 1000
  return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User
