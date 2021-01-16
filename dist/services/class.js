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

class ClassService {
  constructor() {
    if (!instance) {
      console.log('Class Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.Class.create(modelObj);
  }

  async findList(where) {
    return await _models.Class.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.Teacher,
        as: 'teacher'
      }, {
        model: _models.ClassBelongs,
        as: 'classBelongs',
        include: {
          model: _models.Student,
          as: 'student'
        }
      }]
    });
  }

  async findOne(where) {
    return await _models.Class.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.Teacher,
        as: 'teacher'
      }, {
        model: _models.ClassBelongs,
        as: 'classBelongs',
        include: {
          model: _models.Student,
          as: 'student'
        }
      }]
    });
  }

}

var _default = new ClassService();

exports.default = _default;