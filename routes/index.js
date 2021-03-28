var express = require('express')
var router = express.Router()
const objectiveController = require('../controllers/objectiveController')

/* GET home page. */
router.get('/', objectiveController.index)

module.exports = router
