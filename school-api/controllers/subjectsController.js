const Subject = require('../models/subjectModel')
const factory = require('./handlerFactory')

exports.getAllSubjects = factory.getAll(Subject)
exports.createSubject = factory.createOne(Subject)
exports.getSubject = factory.getOne(Subject, [['groupings']])
