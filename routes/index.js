var express = require('express')
var router = express.Router()
const objectiveController = require('../controllers/objectiveController')

router.get('/', objectiveController.index)
router.post('/objectives', objectiveController.store)
router.get('/objectives/:id', objectiveController.show)

module.exports = router
