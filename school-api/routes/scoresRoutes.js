const express = require('express')
const authController = require('../controllers/authController')
const scoresController = require('../controllers/scoresContoller')

const router = express.Router({ mergeParams: true })

router.use(
  // authController.protectRoute,
  // authController.restrictRouteTo("admin"),
  scoresController.defaultSectionFilter
)

router.use((req, res, next) => {
  req.filter = req.params
  next()
})

router
  .route('/')
  .get(scoresController.getScores)
  .post(scoresController.addScore)

router
  .route('/class')
  .patch(scoresController.updateClassScores)
  .get(scoresController.classScoresPreview)

router.route('/student').patch(scoresController.updateStudentScores)

router
  .route('/upload')
  .put(scoresController.uploadExcel, scoresController.uploadScores)

router.route('/scoresheet').get(scoresController.getScoreSheet)

module.exports = router
