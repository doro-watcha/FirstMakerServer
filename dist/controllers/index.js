"use strict";

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));

var _student = _interopRequireDefault(require("./student"));

var _subject = _interopRequireDefault(require("./subject"));

var _bigChapter = _interopRequireDefault(require("./bigChapter"));

var _middleChapter = _interopRequireDefault(require("./middleChapter"));

var _smallChapter = _interopRequireDefault(require("./smallChapter"));

var _problem = _interopRequireDefault(require("./problem"));

var _homework = _interopRequireDefault(require("./homework"));

var _note = _interopRequireDefault(require("./note"));

var _collection = _interopRequireDefault(require("./collection"));

var _class = _interopRequireDefault(require("./class"));

var _exam = _interopRequireDefault(require("./exam"));

var _blackList = _interopRequireDefault(require("./blackList"));

var _workPaper = _interopRequireDefault(require("./workPaper"));

var _workBook = _interopRequireDefault(require("./workBook"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  authController: _auth.default,
  userController: _user.default,
  studentController: _student.default,
  subjectController: _subject.default,
  bigChapterController: _bigChapter.default,
  middleChapterController: _middleChapter.default,
  smallChapterController: _smallChapter.default,
  problemController: _problem.default,
  homeworkController: _homework.default,
  noteController: _note.default,
  collectionController: _collection.default,
  examController: _exam.default,
  workPaperController: _workPaper.default,
  classController: _class.default,
  blackListController: _blackList.default,
  workBookController: _workBook.default
};