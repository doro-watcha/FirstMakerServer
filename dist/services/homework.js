"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class HomeworkService {
  constructor() {
    if (!instance) {
      console.log('HomeworkService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.Homework.create(modelObj);
    const newHomework = await _models.Homework.findOne({
      where: JSON.parse(JSON.stringify(modelObj))
    });
    return newHomework;
  }

  async findList(where) {
    return await _models.Homework.findAll({
      where: JSON.parse(JSON.stringify(where)),
      order: [['id', 'desc']],
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
    return await _models.Homework.findOne({
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

  async update(id, modelObj) {
    await _models.Homework.update(modelObj, {
      where: {
        id
      }
    });
    const homework = await _models.Homework.findOne({
      id
    });
    if (homework == null) throw Error('HOMEWORK_NOT_FOUND');
    return homework;
  }

}

var _default = new HomeworkService();

exports.default = _default;