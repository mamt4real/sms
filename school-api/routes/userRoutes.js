const express = require('express')
const userController = require('../controllers/usersController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/login').post(authController.signin)

router.route('/signup').post(authController.signup)

router.route('/forgotpassword').post(authController.forgotPassword)

router.route('/resetpassword/:token').patch(authController.resetPassword)

router
  .route('/updatepassword')
  .patch(authController.protectRoute, authController.updatePassword)

router
  .route('/updateme')
  .patch(authController.protectRoute, userController.updateMe)

router
  .route('/deleteme')
  .delete(authController.protectRoute, userController.deleteMe)

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router.get('/table', userController.getUsersTable)
router
  .route('/:userID')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router
