const express = require('express')
const sectionController = require('../controllers/sectionsController')
const authController = require('../controllers/authController')

const router = express.Router()

// router.use(
//   authController.protectRoute,
//   authController.restrictRouteTo("admin", "EO")
// );

router
  .route('/')
  .get(sectionController.getAllSections)
  .post(sectionController.createSection)

router
  .route('/:sectionID')
  .get(sectionController.getSection)
  .delete(sectionController.deleteSection)

router.route('/select-active').patch(sectionController.setActive)

module.exports = router
