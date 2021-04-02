const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const objectiveSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: 0,
    },
    subtasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subtask',
        },
    ],
})

module.exports = mongoose.model('Objective', objectiveSchema)
