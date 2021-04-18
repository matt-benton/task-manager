const mongoose = require('mongoose')
const Goal = mongoose.model('Goal')

exports.index = async (req, res) => {
    const goals = await Goal.find()

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
