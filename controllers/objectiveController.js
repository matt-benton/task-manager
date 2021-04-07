const mongoose = require('mongoose')
const Objective = mongoose.model('Objective')
const Subtask = mongoose.model('Subtask')

exports.index = async (req, res) => {
    const objectives = await Objective.find()

    res.render('index', { title: 'Objectives', objectives })
}

exports.store = async (req, res) => {
    await new Objective(req.body).save()
    res.redirect('/')
}

exports.show = async (req, res) => {
    const objective = await Objective.findById(req.params.id).populate('subtasks')

    res.render('showObjective', { objective })
}

exports.destroy = async (req, res) => {
    await Objective.findOneAndDelete({ _id: req.params.id }, async function (err, objective) {
        await Subtask.deleteMany({ objective: objective._id })
    })

    res.redirect('/')
}
