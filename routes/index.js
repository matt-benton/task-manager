var express = require('express')
var router = express.Router()
const objectiveController = require('../controllers/objectiveController')
const subtaskController = require('../controllers/subtaskController')

// objectives
router.get('/', objectiveController.index)
router.post('/objectives', objectiveController.store)
router.get('/objectives/:id', objectiveController.show)
router.delete('/objectives/:id', objectiveController.destroy)

// subtasks
router.post('/objectives/:objective_id/subtasks', subtaskController.store)

module.exports = router
