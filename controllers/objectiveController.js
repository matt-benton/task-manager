const mongoose = require('mongoose')
const Objective = mongoose.model('Objective')
const Subtask = mongoose.model('Subtask')
const Goal = mongoose.model('Goal')

exports.store = async (req, res) => {
    try {
        var goal = await Goal.findById(req.params.goal_id)

        let objective = await new Objective({
            text: req.body.text,
            goal: goal._id,
        })
        await objective.save()

        goal.objectives.push(objective._id)

        await goal.save()
    } catch (err) {
        const errorKeys = Object.keys(err.errors)
        errorKeys.forEach(key => req.flash('error', err.errors[key].message))

        res.redirect('back')
    }

    req.flash('success', 'Objective added successfully.')

    res.redirect(`/goals/${goal._id}`)
}

exports.show = async (req, res) => {
    const objective = await Objective.findById(req.params.objective_id)
        .populate('goal')
        .populate('subtasks')

    res.render('showObjective', { title: objective.text, objective })
}

exports.edit = async (req, res) => {
    const objective = await Objective.findById(req.params.objective_id)

    res.render('editObjective', { title: `Edit ${objective.text}`, objective })
}

exports.update = async (req, res) => {
    try {
        await Objective.findOneAndUpdate({ _id: req.params.objective_id }, req.body, {
            runValidators: true,
        }).exec()
    } catch (err) {
        const errorKeys = Object.keys(err.errors)
        errorKeys.forEach(key => req.flash('error', err.errors[key].message))

        res.redirect('back')
    }

    req.flash('success', 'Objective updated successfully.')

    res.redirect(`/goals/${req.params.goal_id}/objectives/${req.params.objective_id}`)
}

exports.complete = async (req, res) => {
    await Objective.findOneAndUpdate({ _id: req.params.objective_id }, req.body).exec()

    res.redirect(`/goals/${req.params.goal_id}`)
}

exports.destroy = async (req, res) => {
    await Objective.findOneAndDelete(
        { _id: req.params.objective_id },
        async function (err, objective) {
            await Subtask.deleteMany({ objective: objective._id })
        },
    )

    req.flash('success', 'Objective removed successfully.')

    res.redirect(`/goals/${req.params.goal_id}`)
}
