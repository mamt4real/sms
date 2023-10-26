const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')
const Student = require('../models/studentModel')
const multer = require('multer')
const sharp = require('sharp')
const MyError = require('../utils/myError')

const multerStorage = multer.memoryStorage()

exports.normalizeBody = catchAsync(async (req, res, next) => {
  // console.log(req.body)

  next()
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true)
  else cb(new MyError('Error: You can only upload an image', 400), false)
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

exports.uploadStudentPhoto = upload.single('passport')

exports.resizeStudentPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next()
  req.file.filename = `student-${
    req.user?.id || req.body.regno?.replace(/\//g, '-') || req.body.fname
  }-${Date.now()}.jpeg`
  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/students/${req.file.filename}`)
  } catch (error) {
    console.log(error)
  }

  req.body.passport = `img/students/${req.file.filename}`
  next()
})

exports.assignFilter = (req, res, next) => {
  req.filter = req.params.classID ? { classID: req.params.classID } : {}
  next()
}

exports.getStudentsTable = catchAsync(async (req, res, next) => {
  const students = await Student.find({}).sort('classID -gender fname')

  const tabledata = students.map((std) => ({
    id: std._id,
    regno: std.regno,
    name: std.name,
    class: std.classID.class,
    classID: std.classID._id,
    passport: std.passport,
    gender: std.gender,
  }))

  res.status(200).json({ status: 'success', data: tabledata })
})

exports.getAll = factory.getAll(Student)
exports.getOne = factory.getOne(Student, [['classID', 'class'], ['payments']])
exports.deleteStudent = factory.deleteOne(Student)
exports.addStudent = factory.createOne(Student)
exports.updateStudent = factory.updateOne(Student)

// Student.updateMany({}, [{ $unset: ['name'] }], { multi: true }).then((res) =>
//   console.log(res)
// )
// Student.updateMany({}, [
//   { $set: { fname: { $arrayElemAt: [{ $split: ['$name', ' '] }, 0] } } },
//   { $set: { surname: { $arrayElemAt: [{ $split: ['$name', ' '] }, 1] } } },
// ]).then((rwes) => console.log(rwes))
