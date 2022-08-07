const express = require('express')
const router = express.Router()

const bootcampCtrl = require('../controllers/bootcamp.controller')

router
  .route('/')
  .get(bootcampCtrl.getBootcamps)
  .post(bootcampCtrl.createBootcamp)

router
  .route('/:id')
  .get(bootcampCtrl.getBootcamp)
  .put(bootcampCtrl.updateBootcamp)
  .delete(bootcampCtrl.deleteBootcamp)

module.exports = router
