const express = require('express')
const authController = require('../controllers/authController')
const handlerFactory = require('../controllers/handlerFactory')
const Fee = require('../models/feeModel')
const feeController = require('../controllers/feeController')

const router = express.Router()

// router.use(
//   authController.protectRoute,
//   authController.restrictRouteTo("Admin", "EO")
// );

router
  .route('/')
  .get(handlerFactory.getAll(Fee))
  .post(handlerFactory.createOne(Fee))

// router.get('/stats/:feeID', feeController.getFee)
router
  .route('/:feeID')
  .get(feeController.getFee)
  .patch(handlerFactory.updateOne(Fee))
  .delete(handlerFactory.deleteOne(Fee))

router
  .route('/:feeID/class')
  .post(feeController.registerFeeToClass)
  .patch(feeController.updateClassFee)
  .delete(feeController.removeClassFee)

router
  .route('/:feeID/student')
  .post(feeController.registerFeeToStudent)
  .patch(feeController.registerFeeToStudent)

module.exports = router
