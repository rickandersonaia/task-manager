var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

const assert = require('assert');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var projectsRouter = require('./routes/projectsRouter');
var tasksRouter = require('./routes/tasksRouter');
var attachmentsRouter = require('./routes/attachmentsRouter');

const Users = require('./models/user');
const Projects = require('./models/project');
const Tasks = require('./models/task');
const Attachments = require('./models/attachment');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
    useNewUrlParser: true
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => {
    console.log(err)
});


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/project',projectsRouter);
app.use('/task',tasksRouter);
app.use('/attachment',attachmentsRouter);

app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    console.log(err);
});

module.exports = app;
