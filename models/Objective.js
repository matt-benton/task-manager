const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const objectiveSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Please enter the objective text',
    },
    completed: {
        type: Boolean,
        default: 0,
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Goal',
    },
    subtasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subtask',
        },
    ],
})

module.exports = mongoose.model('Objective', objectiveSchema)
