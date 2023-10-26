const express = require('express')
const authController = require('../controllers/authController')
const scoreRouter = require('./scoresRoutes')
const factory = require('../controllers/handlerFactory')
const subjectController = require('../controllers/subjectsController')
const Subject = require('../models/subjectModel')

const router = express.Router()

router.use(/.*\/scores$/, scoreRouter)

// router.use(authController.protectRoute,authController.restrictRouteTo('admin'));
router
  .route('/')
  .get(subjectController.getAllSubjects)
  .post(subjectController.createSubject)

router
  .route('/:subjectID')
  .patch(factory.updateOne(Subject))
  .delete(factory.deleteOne(Subject))
  .get(subjectController.getSubject)

module.exports = router
