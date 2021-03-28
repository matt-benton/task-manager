const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const objectiveSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
    },
})

module.exports = mongoose.model('Objective', objectiveSchema)
