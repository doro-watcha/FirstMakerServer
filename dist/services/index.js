"use strict";

var _subject = _interopRequireDefault(require("./subject"));

var _user = _interopRequireDefault(require("./user"));

var _bigChapter = _interopRequireDefault(require("./bigChapter"));

var _middleChapter = _interopRequireDefault(require("./middleChapter"));

var _smallChapter = _interopRequireDefault(require("./smallChapter"));

var _problem = _interopRequireDefault(require("./problem"));

var _note = _interopRequireDefault(require("./note"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  subjectService: _subject.default,
  userService: _user.default,
  bigChapterService: _bigChapter.default,
  middleChapterService: _middleChapter.default,
  smallChapterService: _smallChapter.default,
  problemService: _problem.default,
  noteService: _note.default
};