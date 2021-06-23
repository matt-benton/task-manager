const mongoose = require('mongoose')
const Subtask = mongoose.model('Subtask')
const Objective = mongoose.model('Objective')

exports.store = async (req, res) => {
    try {
        var objective = await Objective.findById(req.params.objective_id)

        let subtask = await new Subtask({
            text: req.body.text,
            objective: objective._id,
        })
        await subtask.save()

        objective.subtasks.push(subtask._id)

        await objective.save()
    } catch (err) {
        const errorKeys = Object.keys(err.errors)
        errorKeys.forEach(key => req.flash('error', err.errors[key].message))

        res.redirect('back')
    }

    req.flash('success', 'Subtask added successfully.')

    res.redirect(`/goals/${objective.goal._id}/objectives/${req.params.objective_id}`)
}

exports.update = async (req, res) => {
    try {
        await Subtask.findOneAndUpdate({ _id: req.params.subtask_id }, req.body, {
            runValidators: true,
        }).exec()
    } catch (err) {
        const errorKeys = Object.keys(err.errors)
        errorKeys.forEach(key => req.flash('error', err.errors[key].message))

        res.redirect('back')
    }

    // need the goal id to redirect
    let objective = await Objective.findById(req.params.objective_id)

    res.redirect(`/goals/${objective.goal._id}/objectives/${req.params.objective_id}`)
}

exports.destroy = async (req, res) => {
    // remove the subtask from its objective
    let objective = await Objective.findById(req.params.objective_id, function (err, objective) {
        objective.subtasks.remove(req.params.subtask_id)
        objective.save()
    }).exec()

    // delete the subtask
    await Subtask.findByIdAndDelete(req.params.subtask_id)

    req.flash('success', 'Subtask removed successfully.')

    res.redirect(`/goals/${objective.goal._id}/objectives/${req.params.objective_id}`)
}
