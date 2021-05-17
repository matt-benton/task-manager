const mongoose = require('mongoose')
const Goal = mongoose.model('Goal')
const Objective = mongoose.model('Objective')
const Subtask = mongoose.model('Subtask')

exports.index = async (req, res) => {
    const goals = await Goal.find().sort({ name: 1 })

    res.render('index', { title: 'Goals', goals })
}

exports.store = async (req, res) => {
    await new Goal(req.body).save()
    req.flash('success', 'Goal saved successfully.')
    res.redirect('/')
}

exports.show = async (req, res) => {
    const goal = await Goal.findById(req.params.id).populate({
        path: 'objectives',
        populate: { path: 'subtasks', match: { completed: { $eq: false } } },
    })

    res.render('showGoal', { title: goal.name, goal })
}

exports.edit = async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    res.render('editGoal', { title: `Edit ${goal.name}`, goal })
}

exports.update = async (req, res) => {
    await Goal.findOneAndUpdate({ _id: req.params.id }, req.body).exec()

    res.redirect(`/goals/${req.params.id}`)
}

exports.destroy = async (req, res) => {
    await Goal.findOneAndDelete({ _id: req.params.goal_id }, async function (err, goal) {
        goal.objectives.forEach(async objective => {
            await Objective.findOneAndDelete(
                { _id: objective._id },
                async function (err, objective) {
                    await Subtask.deleteMany({ objective: objective._id })
                },
            )
        })
    })

    req.flash('success', 'Goal removed successfully.')

    res.redirect('/')
}
