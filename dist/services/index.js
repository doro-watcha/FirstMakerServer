"use strict";

var _subject = _interopRequireDefault(require("./subject"));

var _user = _interopRequireDefault(require("./user"));

var _bigChapter = _interopRequireDefault(require("./bigChapter"));

var _middleChapter = _interopRequireDefault(require("./middleChapter"));

var _smallChapter = _interopRequireDefault(require("./smallChapter"));

var _problem = _interopRequireDefault(require("./problem"));

var _note = _interopRequireDefault(require("./note"));

var _collection = _interopRequireDefault(require("./collection"));

var _workPaper = _interopRequireDefault(require("./workPaper"));

var _workBook = _interopRequireDefault(require("./workBook"));

var _workBookRecord = _interopRequireDefault(require("./workBookRecord"));

var _exam = _interopRequireDefault(require("./exam"));

var _homework = _interopRequireDefault(require("./homework"));

var _teacher = _interopRequireDefault(require("./teacher"));

var _student = _interopRequireDefault(require("./student"));

var _class = _interopRequireDefault(require("./class"));

var _classBelongs = _interopRequireDefault(require("./classBelongs"));

var _blackList = _interopRequireDefault(require("./blackList"));

var _source = _interopRequireDefault(require("./source"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  subjectService: _subject.default,
  userService: _user.default,
  bigChapterService: _bigChapter.default,
  middleChapterService: _middleChapter.default,
  smallChapterService: _smallChapter.default,
  problemService: _problem.default,
  noteService: _note.default,
  collectionService: _collection.default,
  workPaperService: _workPaper.default,
  workBookService: _workBook.default,
  workBookRecordService: _workBookRecord.default,
  examService: _exam.default,
  homeworkService: _homework.default,
  teacherService: _teacher.default,
  studentService: _student.default,
  classService: _class.default,
  classBelongsService: _classBelongs.default,
  blackListService: _blackList.default,
  sourceService: _source.default
};