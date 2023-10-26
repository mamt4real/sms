const factory = require('./handlerFactory')

const Class = require('../models/classModel')
const SubReg = require('../models/subregModel')
const catchAsync = require('../utils/catchAsync')
const Section = require('../models/sectionModel')

exports.getAll = factory.getAll(Class)
exports.deleteClass = factory.deleteOne(Class)
exports.updateClass = factory.updateOne(Class)
exports.addClass = factory.createOne(Class)
exports.getOne = factory.getOne(Class, [
  ['subjects', 'subject'],
  ['students', 'fname mname surname gender regno passport -classID'],
  ['master', 'fname mname surname'],
])

exports.getStudents = async (req, res) => {
  const data = await Class.findById(req.params.classID)
    .populate('students', 'name gender passport -classID')
    .select('students name')
  res.status(200).json({ statuse: 'success', data })
}

exports.registerSubjects = catchAsync(async (req, res, next) => {
  const cls = await Class.findById(req.params.classID).populate(
    'students',
    'classID'
  )
  const subs = req.body.subjects.filter((sub) => !cls.subjects.includes(sub))
  const updated = await Class.findByIdAndUpdate(
    cls.id,
    { $addToSet: { subjects: { $each: subs } } },
    { new: true, runValidators: true }
  )
  await addToStudents(subs, cls)
  res.status(200).json({
    status: 'success',
    message: 'Subject(s) added successfully',
  })
})

exports.deRegisterSubject = catchAsync(async (req, res, next) => {
  const { classID } = req.params
  await Class.findByIdAndUpdate(classID, {
    $pull: { subjects: req.body.subject },
  })
  const active = await Section.getActive()
  await SubReg.deleteMany({
    classID,
    section: active,
    subjectID: req.body.subject,
  })

  res.status(204).send()
})

const addToStudents = async (subs, cls) => {
  subs.forEach(async (sub) => {
    await SubReg.addRecord(cls.students, sub)
  })
}

exports.getClassesTable = catchAsync(async (req, res, next) => {
  const clases = await Class.find({})
    .sort('class')
    .populate('students')
    .populate('master', 'fname mname surname')

  const tabledata = clases.map((c) => ({
    id: c._id,
    class: c.class,
    subjects: c.subjects,
    master: `${c.master?.fname} ${c.master?.mname || ''} ${c.master?.surname}`,
    noOfStudents: c.noOfStudents,
  }))

  res.status(200).json({ status: 'success', data: tabledata })
})

// Class.find({})
//   .limit(3)
//   .then((res) => console.log(res))
