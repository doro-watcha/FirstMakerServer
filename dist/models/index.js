"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

var _dbConfig = _interopRequireDefault(require("../config/db-config"));

var _Problem = _interopRequireDefault(require("./Problem"));

var _Exam = _interopRequireDefault(require("./Exam"));

var _Homework = _interopRequireDefault(require("./Homework"));

var _Class = _interopRequireDefault(require("./Class"));

var _ClassBelongs = _interopRequireDefault(require("./ClassBelongs"));

var _Subject = _interopRequireDefault(require("./Subject"));

var _BigChapter = _interopRequireDefault(require("./BigChapter"));

var _MiddleChapter = _interopRequireDefault(require("./MiddleChapter"));

var _SmallChapter = _interopRequireDefault(require("./SmallChapter"));

var _User = _interopRequireDefault(require("./User"));

var _Student = _interopRequireDefault(require("./Student"));

var _Teacher = _interopRequireDefault(require("./Teacher"));

var _Note = _interopRequireDefault(require("./Note"));

var _Collection = _interopRequireDefault(require("./Collection"));

var _WorkBook = _interopRequireDefault(require("./WorkBook"));

var _WorkBookRecord = _interopRequireDefault(require("./WorkBookRecord"));

var _WorkPaper = _interopRequireDefault(require("./WorkPaper"));

var _BlackList = _interopRequireDefault(require("./BlackList"));

var _Source = _interopRequireDefault(require("./Source"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const env = process.env.NODE_ENV || 'development';
const config = _dbConfig.default[env];
const sequelize = new _sequelize.default(config.database, config.username, config.password, config);
const models = {
  Problem: _Problem.default.init(sequelize, _sequelize.default),
  Exam: _Exam.default.init(sequelize, _sequelize.default),
  Homework: _Homework.default.init(sequelize, _sequelize.default),
  Class: _Class.default.init(sequelize, _sequelize.default),
  ClassBelongs: _ClassBelongs.default.init(sequelize, _sequelize.default),
  Subject: _Subject.default.init(sequelize, _sequelize.default),
  BigChapter: _BigChapter.default.init(sequelize, _sequelize.default),
  MiddleChapter: _MiddleChapter.default.init(sequelize, _sequelize.default),
  SmallChapter: _SmallChapter.default.init(sequelize, _sequelize.default),
  User: _User.default.init(sequelize, _sequelize.default),
  Student: _Student.default.init(sequelize, _sequelize.default),
  Teacher: _Teacher.default.init(sequelize, _sequelize.default),
  Note: _Note.default.init(sequelize, _sequelize.default),
  Collection: _Collection.default.init(sequelize, _sequelize.default),
  WorkBook: _WorkBook.default.init(sequelize, _sequelize.default),
  WorkBookRecord: _WorkBookRecord.default.init(sequelize, _sequelize.default),
  WorkPaper: _WorkPaper.default.init(sequelize, _sequelize.default),
  BlackList: _BlackList.default.init(sequelize, _sequelize.default),
  Source: _Source.default.init(sequelize, _sequelize.default)
};
Object.values(models).filter(model => typeof model.associate === 'function').forEach(model => model.associate(models));
module.exports = { ...models,
  sequelize,
  Sequelize: _sequelize.default
};