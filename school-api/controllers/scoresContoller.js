const factory = require('../controllers/handlerFactory')
const Section = require('../models/sectionModel')
const Subreg = require('../models/subregModel')
const catchAsync = require('../utils/catchAsync')
const MyError = require('../utils/myError')
const readXlsxFile = require('read-excel-file/node')
const excel = require('exceljs')
const multer = require('multer')
const path = require('path')
const { Session } = require('inspector')
const Class = require('../models/classModel')
const Student = require('../models/studentModel')

exports.defaultSectionFilter = catchAsync(async (req, res, next) => {
  const sectionID = await Section.getActive()
  if (!req.body.sectionID) req.body = { ...req.body, sectionID }
  req.filter = { sectionID }
  next()
})

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml')
  ) {
    cb(null, true)
  } else {
    cb('Please upload only excel file.', false)
  }
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/excel_files/')
  },
  filename: (req, file, cb) => {
    cb(null, `upload-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  fileFilter: excelFilter,
})

exports.uploadExcel = upload.single('scoresheet')

exports.uploadScores = catchAsync(async (req, res, next) => {
  const { subjectID } = req.body
  if (!subjectID) throw new MyError('Please specify the subjectID', 400)

  if (req.file == undefined)
    throw new MyError('Please upload an excel file!', 400)

  const filePath = path.join('public/excel_files/', req.file.filename)
  const rows = await readXlsxFile(filePath)

  // skip header
  rows.shift()

  const section = await Section.getActive()

  //remove leading and trailing quotes
  const myStrip = (val) => val.replace(/^"|"$/g, '')

  for (const row of rows) {
    await Subreg.updateOne(
      { studentID: myStrip(row[0]), subjectID, section },
      { fstCa: row[2], scnCa: row[3], exam: row[4] }
    )
  }
  res
    .status(200)
    .json({ status: 'success', message: 'Scores Uploaded Successfully!' })
})

exports.getScores = factory.getAll(Subreg)
exports.addScore = factory.createOne(Subreg)

exports.updateClassScores = catchAsync(async (req, res, next) => {
  const { scores, subjectID } = req.body
  if (!scores || !subjectID)
    throw new MyError(
      `Please provide the ${scores ? 'subjectID' : 'scores'} field !!!`,
      400
    )

  if (!(scores instanceof Array))
    throw new MyError('Scores field should be an array', 400)
  const section = req.body.sectionID || (await Section.getActive())
  for (const score of scores) {
    try {
      const { regno, fstCa, scnCa, exam } = score
      const std = await Student.findOne({ regno }).select('_id')
      std &&
        (await Subreg.updateOne(
          { studentID: std._id, subjectID, section },
          { fstCa, scnCa, exam }
        ))
    } catch (error) {
      throw new MyError(
        'Each score should be an object containing studentID and atleast one of [fstCa, scnCa, exam] !!',
        400
      )
    }
  }
  res
    .status(200)
    .json({ status: 'success', message: 'Scores recorded successfully!' })
})

exports.classScoresPreview = catchAsync(async (req, res, next) => {
  const { classID, subjectID } = req.query
  const section = req.query.section || (await Section.getActive())

  if (!classID || classID === 'undefined')
    return next(new MyError('Please Select Class', 400))

  // if (!classID && !subjectID)
  //   return res
  //     .status(200)
  //     .json({
  //       scores: [],
  //       className: '',
  //       subject: '',
  //       message: 'Select Class and Subject To View Scores',
  //     })
  const classInfo = await Class.findById(classID)
    .select('subjects class')
    .populate('subjects')

  if (!classInfo) return next(new MyError('Invalid classID', 400))

  const subject = classInfo.subjects.find(
    (sbj) => sbj._id.toString() === subjectID
  )
  if (!subject)
    return next(
      new MyError(`${classInfo.class} are not offering this subject`, 400)
    )

  const scores = await Subreg.find({ classID, subjectID, section })

  const data = scores.map((score) => ({
    _id: score._id,
    name: score.studentID.name,
    ca1: score.fstCa,
    ca2: score.scnCa,
    exam: score.exam,
  }))

  res.status(200).json({
    status: 'success',
    data: {
      scores: data,
      className: classInfo.class,
      subject: subject.subject,
    },
  })
})

exports.updateStudentScores = catchAsync(async (req, res, next) => {
  const { scores, studentID } = req.body
  if (!scores || !studentID)
    throw new MyError(
      `Please provide the ${scores ? 'studentID' : 'scores'} field !!!`,
      400
    )

  if (!(scores instanceof Array))
    throw new MyError('Scores field should be an array', 400)

  const section = await Section.getActive()
  for (const score of scores) {
    try {
      const { subjectID, fstCa, scnCa, exam } = score
      await Subreg.updateOne(
        { studentID, subjectID, section },
        { fstCa, scnCa, exam }
      )
    } catch (error) {
      throw new MyError(
        'Each score should be an object containing subjectID and atleast one of [fstCa, scnCa, exam] !!',
        400
      )
    }
  }
  res
    .status(200)
    .json({ status: 'success', message: 'Scores recorded successfully!' })
})

exports.getScoreSheet = catchAsync(async (req, res, next) => {
  //for testing in browser
  if (!req.body.classID) req.body.classID = '617da0cbd3797d0b4c22db07'
  const cls = await Class.findById(req.body.classID)
  if (!cls) throw new MyError('Please provide the classID', 400)
  const workbook = new excel.Workbook()
  const worksheet = workbook.addWorksheet('Tutorials')

  worksheet.columns = [
    { header: 'Registration No', key: 'regno', width: 15 },
    { header: 'Name', key: 'name', width: 40 },
    { header: 'Ca1', key: 'fstca', width: 10 },
    { header: 'Ca2', key: 'scnca', width: 10 },
    { header: 'Exam', key: 'exam', width: 10 },
  ]

  // Add Array Rows
  const students = await Student.find({ classID: cls._id }).sort('-gender name')

  worksheet.addRows(students)
  const section = await Section.findOne({ active: true })

  // res is a Stream object
  res.setHeader(
    'Content-disposition',
    `attachment; filename=${cls.class}-scoresheet-${section.session}-${section.term}_term.xlsx`
  )
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end()
  })
})
