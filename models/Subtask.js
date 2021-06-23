const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const subtaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Please enter the subtask text',
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
