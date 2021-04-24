const mongoose = require('mongoose')
const Objective = mongoose.model('Objective')
const Subtask = mongoose.model('Subtask')
const Goal = mongoose.model('Goal')

exports.store = async (req, res) => {
    let goal = await Goal.findById(req.params.goal_id)

    let objective = await new Objective({
        text: req.body.text,
        goal: goal._id,
    })
    await objective.save()

    goal.objectives.push(objective._id)

    await goal.save()

    res.redirect(`/goals/${goal._id}`)
}

exports.show = async (req, res) => {
    const objective = await Objective.findById(req.params.objective_id)
        .populate('goal')
        .populate('subtasks')

    res.render('showObjective', { objective })
}

exports.update = async (req, res) => {
    const objective = await Objective.findOneAndUpdate(
        { _id: req.params.objective_id },
        req.body,
    ).exec()

    res.redirect(`/goals/${req.params.goal_id}`)
}

exports.destroy = async (req, res) => {
    await Objective.findOneAndDelete(
        { _id: req.params.objective_id },
        async function (err, objective) {
            await Subtask.deleteMany({ objective: objective._id })
        },
    )

    res.redirect(`/goals/${req.params.goal_id}`)
}
