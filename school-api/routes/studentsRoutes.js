const express = require('express')
const studentController = require('../controllers/studentsController')
const authController = require('../controllers/authController')
const scoreRouter = require('./scoresRoutes')

const router = express.Router({ mergeParams: true })

//router.param("id", verifyID);
router.use(/.*\/scores$/, scoreRouter)

router
  .route('/')
  .get(studentController.assignFilter, studentController.getAll)
  .post(
    studentController.uploadStudentPhoto,
    studentController.normalizeBody,
    studentController.resizeStudentPhoto,
    studentController.addStudent
  )

// router.get('/:studentID', studentController.getOne)

router.get('/table', studentController.getStudentsTable)

router
  .route('/:studentID')
  .get(studentController.getOne)
  .patch(
    studentController.uploadStudentPhoto,
    studentController.resizeStudentPhoto,
    studentController.updateStudent
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo('admin'),
    studentController.deleteStudent
  )

/* router.route("/:id/subregs")
    .get(getStudentScores)
    .put(updateStudentScores) */

module.exports = router
