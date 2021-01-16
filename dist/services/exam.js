"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class ExamService {
  constructor() {
    if (!instance) {
      console.log('Exam Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.Exam.create(modelObj);

    const newExam = _models.Exam.findOne({
      where: modelObj
    });

    return newExam;
  }

  async findList(where) {
    return await _models.Exam.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.Note,
        as: 'note',
        include: [{
          model: _models.Problem,
          as: 'problem',
          include: [{
            model: _models.BigChapter,
            as: 'bigChapter'
          }, {
            model: _models.MiddleChapter,
            as: 'middleChapter'
          }, {
            model: _models.SmallChapter,
            as: 'smallChapter'
          }]
        }]
      }, {
        model: _models.Teacher,
        as: 'teacher'
      }]
    });
  }

  async findOne(where) {
    return await _models.Exam.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.Note,
        as: 'note',
        include: [{
          model: _models.Problem,
          as: 'problem',
          include: [{
            model: _models.BigChapter,
            as: 'bigChapter'
          }, {
            model: _models.MiddleChapter,
            as: 'middleChapter'
          }, {
            model: _models.SmallChapter,
            as: 'smallChapter'
          }]
        }]
      }, {
        model: _models.Teacher,
        as: 'teacher'
      }]
    });
  }

  async delete(id) {
    const Exam = await Exam.findOne({
      where: id
    });

    if (Exam == null) {
      throw Error('EXAM_NOT_FOUND');
    } else {
      await Exam.destroy();
    }
  }

}

var _default = new ExamService();

exports.default = _default;