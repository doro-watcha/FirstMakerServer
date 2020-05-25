'use strict';

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/user/login');
var registerRouter = require('./routes/user/register');
var usernameValidationRouter = require('./routes/user/usernameValidation');
var registerRequestRouter = require('./routes/user/registerRequest');
var profileEditRouter = require('./routes/profile/profileEdit');
var profileRouter = require('./routes/profile/profile');
var profileEditRequestRouter = require('./routes/profile/profileEditRequest');

var scoreRouter = require('./routes/score/score');

var app = (0, _express2.default)();

// view engine setup
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/user/login', loginRouter);
app.use('/user/register', registerRouter);
app.use('/user/usernameValidation', usernameValidationRouter);
app.use('/user/registerRequest', registerRequestRouter);
app.use('/profile/profileEdit', profileEditRouter);
app.use('/profile/profile', profileRouter);
app.use('/profile/profileEditRequest', profileEditRequestRouter);

app.use('/score', scoreRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next((0, _httpErrors2.default)(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
module.exports = app;
