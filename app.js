var createError = require('http-errors')
var express = require('express')
const methodOverride = require('method-override')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const helpers = require('./helpers')
const session = require('express-session')

// connect to database
mongoose.connect('mongodb://localhost/task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
const db = mongoose.connection
mongoose.connection.on('error', err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

// import all of our models
require('./models/Goal')
require('./models/Objective')
require('./models/Subtask')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
    session({
        secret: 'kitty',
        resave: false,
        saveUninitialized: true,
    }),
)

// middleware for flashing messages
app.use(flash())

app.use((req, res, next) => {
    res.locals.h = helpers
    res.locals.flashes = req.flash()
    next()
})

// allow using methods such as DELETE and PUT
app.use(methodOverride('_method'))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
