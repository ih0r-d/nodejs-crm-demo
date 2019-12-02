const express = require('express')
const controller = require('../controllers/category')

const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.post('/:id', controller.update)
router.delete('/:id', controller.deleteById)

module.exports = router
