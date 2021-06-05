const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a goal name',
    },
    description: {
        type: String,
        trim: true,
    },
    objectives: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Objective',
        },
    ],
})

module.exports = mongoose.model('Goal', goalSchema)
