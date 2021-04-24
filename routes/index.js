var express = require('express')
var router = express.Router()
const goalController = require('../controllers/goalController')
const objectiveController = require('../controllers/objectiveController')
const subtaskController = require('../controllers/subtaskController')

// goals
router.get('/', goalController.index)
router.post('/goals', goalController.store)
router.get('/goals/:id', goalController.show)
router.get('/goals/:id/edit', goalController.edit)
router.put('/goals/:id', goalController.update)

// objectives
router.post('/goals/:goal_id/objectives', objectiveController.store)
router.get('/objectives/:objective_id', objectiveController.show)
router.put('/goals/:goal_id/objectives/:objective_id', objectiveController.update)
router.delete('/goals/:goal_id/objectives/:objective_id', objectiveController.destroy)

// subtasks
router.post('/objectives/:objective_id/subtasks', subtaskController.store)
router.put('/objectives/:objective_id/subtasks/:subtask_id', subtaskController.update)
router.delete('/objectives/:objective_id/subtasks/:subtask_id', subtaskController.destroy)

module.exports = router
