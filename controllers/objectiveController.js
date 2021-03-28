const mongoose = require('mongoose')
const Objective = mongoose.model('Objective')

exports.index = async (req, res) => {
    const objectives = await Objective.find()

    res.render('index', { title: 'Objectives', objectives })
}

exports.store = async (req, res) => {
    await new Objective(req.body).save()
    res.redirect('/')
}
