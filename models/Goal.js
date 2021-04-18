const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    objectives: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Objective',
        },
    ],
})

module.exports = mongoose.model('Goal', goalSchema)
