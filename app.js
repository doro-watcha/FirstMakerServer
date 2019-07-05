var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/user/login');
var registerRouter = require('./routes/user/register');
var usernameValidationRouter = require('./routes/user/usernameValidation');
var registerRequestRouter = require('./routes/user/registerRequest');
var profileEditRouter = require('./routes/profile/profileEdit');
var profileRouter = require('./routes/profile/profile');
var profileEditRequestRouter = require('./routes/profile/profileEditRequest');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/user/login', loginRouter);
app.use('/user/register', registerRouter);
app.use('/user/usernameValidation', usernameValidationRouter);
app.use('/user/registerRequest', registerRequestRouter);
app.use('/profile/profileEdit', profileEditRouter);
app.use('/profile/profile', profileRouter);
app.use('/profile/profileEditRequest',profileEditRequestRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
module.exports = app;
