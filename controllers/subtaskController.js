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

    await objective.save()

    res.redirect(`/goals/${objective.goal.id}/objectives/${objective._id}`)
}

exports.update = async (req, res) => {
    await Subtask.findOneAndUpdate({ _id: req.params.subtask_id }, req.body).exec()

    // need the goal id to redirect
    let objective = await Objective.findById(req.params.objective_id)

    res.redirect(`/goals/${objective.goal.id}/objectives/${req.params.objective_id}`)
}

exports.destroy = async (req, res) => {
    // remove the subtask from its objective
    await Objective.findById(req.params.objective_id, function (err, objective) {
        objective.subtasks.remove(req.params.subtask_id)
        objective.save()
    }).exec()

    // delete the subtask
    await Subtask.findByIdAndDelete(req.params.subtask_id)

    res.redirect(`/objectives/${req.params.objective_id}`)
}
