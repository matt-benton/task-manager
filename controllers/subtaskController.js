const mongoose = require('mongoose')
const Subtask = mongoose.model('Subtask')
const Objective = mongoose.model('Objective')

exports.store = async (req, res) => {
    let objective = await Objective.findById(req.params.objective_id)

    let subtask = await new Subtask({
        text: req.body.text,
        objective: objective._id,
    })
    await subtask.save()

    objective.subtasks.push(subtask._id)
    await objective.updateOne(objective)

    res.redirect(`/objectives/${objective._id}`)
}
