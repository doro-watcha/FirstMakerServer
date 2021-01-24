"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _moment = _interopRequireDefault(require("moment"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class ClassBelongsService {
  constructor() {
    if (!instance) {
      console.log('ClassBelongs Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.ClassBelongs.create(modelObj);
  }

  async findList(where) {
    return await _models.ClassBelongs.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: {
        model: _models.Student,
        as: 'student'
      }
    });
  }

  async findOne(where) {
    return await _models.ClassBelongs.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: {
        model: _models.Student,
        as: 'student'
      }
    });
  }

  async findOneByStudentId(studentId) {
    return await _models.ClassBelongs.findOne({
      where: {
        studentId
      },
      include: {
        model: _models.Class,
        as: 'class'
      }
    });
  }

  async findListByStudentId(studentId) {
    return await _models.ClassBelongs.findAll({
      where: {
        studentId
      },
      include: {
        model: _models.Class,
        as: 'class'
      }
    });
  }

  async delete(studentId, classId) {
    return await _models.ClassBelongs.destroy({
      where: {
        studentId,
        classId
      }
    });
  }

}

var _default = new ClassBelongsService();

exports.default = _default;