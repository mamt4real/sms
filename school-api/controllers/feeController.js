const Fee = require('../models/feeModel')
const FeeReg = require('../models/feeregModel')
const catchAsync = require('../utils/catchAsync')
const MyError = require('../utils/myError')
const mongoose = require('mongoose')
const Section = require('../models/sectionModel')
const Class = require('../models/classModel')
const Student = require('../models/studentModel')

exports.getFee = catchAsync(async (req, res, next) => {
  const { feeID } = req.params

  const currentId =  await Section.getActive()
  const feeDoc = await Fee.findById(feeID).populate({
    path: 'payments',
    match: { section: currentId },
  })
  if (!feeDoc) return next(new MyError('Invalid Fee ID', 400))

  const feeStats = await FeeReg.aggregate([
    { $match: { fee: mongoose.Types.ObjectId(feeID), section: currentId } },
    {
      $addFields: {
        status: {
          $switch: {
            branches: [
              { case: { $gt: ['$paid', 0] }, then: 'Deposit' },
              { case: { $gte: ['$paid', '$amount'] }, then: 'Paid' },
              { case: { $eq: ['$paid', 0] }, then: 'Not Paid' },
            ],
            default: 'Not Paid',
          },
        },
      },
    },
    {
      $group: {
        _id: '$class',
        amount: { $max: '$amount' },
        data: { $push: '$status' },
      },
    },
    {
      $lookup: {
        from: 'classes',
        localField: '_id',
        foreignField: '_id',
        as: 'class',
      },
    },
    {
      $unwind: { path: '$class' },
    },
    {
      $addFields: { class: '$class.class', classID: '$class._id' },
    },
  ])

  res
    .status(200)
    .json({ status: 'success', data: { stats: feeStats, doc: feeDoc } })
})

exports.registerFeeToClass = catchAsync(async (req, res, next) => {
  const { feeID } = req.params
  const { amount, classes } = req.body
  if (!amount || !classes)
    return next(new MyError('Please provide amount and class(es) id', 400))

  for (const classID of classes) {
    const classData = await Class.findById(classID).populate('students')
    if (!classData) return next(new MyError('No Class with the given id', 400))
    await FeeReg.registerFee(classData.students, feeID, amount)
  }

  res
    .status(200)
    .json({ status: 'success', message: 'Fee Registered Successfully' })
})

exports.updateClassFee = catchAsync(async (req, res, next) => {
  const currentId = await Section.getActive()
  const { feeID } = req.params
  const { amount, classID } = req.body
  if (!amount || !classID)
    return next(new MyError('Please provide amount and classID', 400))
  await FeeReg.updateMany(
    { class: classID, fee: feeID, section: currentId },
    { amount }
  )
  res
    .status(200)
    .json({ status: 'success', message: 'Fee Updated Successfully' })
})

exports.removeClassFee = catchAsync(async (req, res, next) => {
  const currentId = await Section.getActive()
  const { feeID } = req.params
  const { classID } = req.body
  if (!classID) return next(new MyError('Please provide classID', 400))

  await FeeReg.deleteMany({ class: classID, fee: feeID, section: currentId })
  res
    .status(204)
    .json({ status: 'success', message: 'Fee Removed Successfully' })
})

exports.registerFeeToStudent = catchAsync(async (req, res, next) => {
  const { feeID } = req.params
  const { student, amount } = req.body
  const std = await Student.findById(student)

  if (!std) return next(new MyError("Student doesn't exist", 400))

  await FeeReg.registerFee([std], feeID, amount)
  res
    .status(201)
    .json({ status: 'success', message: 'Fee Registered Successfully' })
})
