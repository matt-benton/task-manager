const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const subtaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: 0,
    },
    objective: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Objective',
    },
})

module.exports = mongoose.model('Subtask', subtaskSchema)
