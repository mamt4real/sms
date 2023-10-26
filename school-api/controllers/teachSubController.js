const TeachSub = require('../models/teachsubjModel')
const handlerFactory = require('./handlerFactory')

exports.getAll = handlerFactory.getAll(TeachSub)
exports.getOne = handlerFactory.getOne(TeachSub)
exports.createOne = handlerFactory.createOne(TeachSub)
exports.updateOne = handlerFactory.updateOne(TeachSub)
exports.deleteOne = handlerFactory.deleteOne(TeachSub)
