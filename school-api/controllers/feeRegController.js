const FeeReg = require('../models/feeregModel')
const catchAsync = require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
const Section = require('../models/sectionModel')
const Student = require('../models/studentModel')
const { initializePayment, verifyPayment } = require('../utils/paystack')

exports.defaultSectionFilter = catchAsync(async (req, res, next) => {
  const sectionID = await Section.getActive()
  if (!req.body.sectionID) req.body = { ...req.body, sectionID }
  if (!req.query.sectionID) req.filter = { sectionID }
  next()
})

exports.getAllRecords = handlerFactory.getAll(FeeReg)
exports.getOne = handlerFactory.getOne(FeeReg)
exports.updatePayment = handlerFactory.updateOne(FeeReg)
exports.removeRecord = handlerFactory.deleteOne(FeeReg)

exports.getPaidList = catchAsync(async (req, res, next) => {
  const results = await FeeReg.find({
    ...req.body,
    ...req.query,
    $expr: { $eq: ['$amount', '$paid'] },
  })
  res
    .status(200)
    .json({ status: 'success', results: results.length, data: results })
})

exports.paystackPay = catchAsync(async (req, res, next) => {
  const { email, amount } = req.body
  const data = {
    email,
    amount: amount * 100,
  }

  data.metadata = {
    fullName: req.body.full_name,
    studentID: req.body.studentID,
  }

  await initializePayment(data, (result) => {
    // console.log(result);
    // res.status(200).json(result);
    res.redirect(result.data.authorization_url)
  })
})

exports.paystackCallback = catchAsync(async (req, res, next) => {
  const ref = req.query.reference
  await verifyPayment(ref, (result) => {
    const { customer, reference, amount, metadata } = result.data
    //do some updates in the database
    res.status(200).json({
      status: 'success',
      message: 'Payment successful!',
      data: { customer, reference, amount, metadata },
    })
  })
})

exports.getPendingList = catchAsync(async (req, res, next) => {})

// const fee = '6245c77385d4205378c875e7'
// const section = '61ba8371515e6d4ec837c871'
// const amount = 35000

// Student.find({})
//   .then((stds) => {
//     FeeReg.create(
//       stds.map((std) => ({
//         student: std._id,
//         class: std.classID,
//         fee,
//         section,
//         amount,
//       }))
//     )
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err))
//   })
//   .catch((err) => console.log(err))
