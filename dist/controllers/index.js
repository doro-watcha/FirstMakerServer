"use strict";

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));

var _subject = _interopRequireDefault(require("./subject"));

var _bigChapter = _interopRequireDefault(require("./bigChapter"));

var _middleChapter = _interopRequireDefault(require("./middleChapter"));

var _smallChapter = _interopRequireDefault(require("./smallChapter"));

var _problem = _interopRequireDefault(require("./problem"));

var _homework = _interopRequireDefault(require("./homework"));

var _note = _interopRequireDefault(require("./note"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  authController: _auth.default,
  userController: _user.default,
  subjectController: _subject.default,
  bigChapterController: _bigChapter.default,
  middleChapterController: _middleChapter.default,
  smallChapterController: _smallChapter.default,
  problemController: _problem.default,
  homeworkController: _homework.default,
  notecontroller
};