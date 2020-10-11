"use strict";

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));

var _subject = _interopRequireDefault(require("./subject"));

var _bigChapter = _interopRequireDefault(require("./bigChapter"));

var _middleChapter = _interopRequireDefault(require("./middleChapter"));

var _smallChapter = _interopRequireDefault(require("./smallChapter"));

var _problem = _interopRequireDefault(require("./problem"));

var _note = _interopRequireDefault(require("./note"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.use('/auth', _auth.default);
router.use('/user', _user.default);
router.use('/subject', _subject.default);
router.use('/bigChapter', _bigChapter.default);
router.use('/middleChapter', _middleChapter.default);
router.use('/smallChapter', _smallChapter.default);
router.use('/problem', _problem.default);
router.use('/note', _note.default);
module.exports = router;