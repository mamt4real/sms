const { Router } = require('express')
const techSubjController = require('../controllers/teachSubController')

const router = Router()

router
  .route('/')
  .get(techSubjController.getAll)
  .post(techSubjController.createOne)

router
  .route('/:teachsubID')
  .patch(techSubjController.updateOne)
  .get(techSubjController.getOne)
  .delete(techSubjController.deleteOne)

module.exports = router
