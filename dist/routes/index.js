"use strict";

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));

var _student = _interopRequireDefault(require("./student"));

var _subject = _interopRequireDefault(require("./subject"));

var _bigChapter = _interopRequireDefault(require("./bigChapter"));

var _middleChapter = _interopRequireDefault(require("./middleChapter"));

var _smallChapter = _interopRequireDefault(require("./smallChapter"));

var _problem = _interopRequireDefault(require("./problem"));

var _note = _interopRequireDefault(require("./note"));

var _collection = _interopRequireDefault(require("./collection"));

var _exam = _interopRequireDefault(require("./exam"));

var _homework = _interopRequireDefault(require("./homework"));

var _workBook = _interopRequireDefault(require("./workBook"));

var _workPaper = _interopRequireDefault(require("./workPaper"));

var _class = _interopRequireDefault(require("./class"));

var _blackList = _interopRequireDefault(require("./blackList"));

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
router.use('/collection', _collection.default);
router.use('/exam', _exam.default);
router.use('/homework', _homework.default);
router.use('/workBook', _workBook.default);
router.use('/workPaper', _workPaper.default);
router.use('/student', _student.default);
router.use('/class', _class.default);
router.use('/blackList', _blackList.default);
module.exports = router;