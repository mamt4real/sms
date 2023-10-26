const express = require('express')
const classController = require('../controllers/classesController')
const authController = require('../controllers/authController')
const studentRouter = require('./studentsRoutes')
const scoreRouter = require('./scoresRoutes')

const router = express.Router({ mergeParams: true })

router.route('/').get(classController.getAll).post(classController.addClass)
router.get('/table', classController.getClassesTable)
// router.use(authController.protectRoute)

router.use(/.*\/scores$/, scoreRouter)
router.use('/:classID/students', studentRouter)

// router.use("/:classID/subjects",studentRouter);

router
  .route('/:classID')
  .get(classController.getOne)
  .patch(classController.updateClass)
  .delete(classController.deleteClass)

router
  .route('/:classID/subjects')
  .post(classController.registerSubjects)
  .delete(classController.deRegisterSubject)

module.exports = router
