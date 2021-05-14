const mongoose = require('mongoose')
const Goal = mongoose.model('Goal')

exports.index = async (req, res) => {
    const goals = await Goal.find().sort({ name: 1 })

    res.render('index', { title: 'Goals', goals })
}

exports.store = async (req, res) => {
    await new Goal(req.body).save()
    res.redirect('/')
}

exports.show = async (req, res) => {
    const goal = await Goal.findById(req.params.id).populate('objectives')

    res.render('showGoal', { goal })
}

exports.edit = async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    res.render('editGoal', { goal })
}

exports.update = async (req, res) => {
    await Goal.findOneAndUpdate({ _id: req.params.id }, req.body).exec()

    res.redirect(`/goals/${req.params.id}`)
}
