"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class SubjectService {
  constructor() {
    if (!instance) {
      console.log('SubjectService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.Subject.create(modelObj);
    const newSubject = await _models.Subject.findOne({
      where: {
        name: modelObj.name
      }
    });
    if (newSubject == null) throw Error('SUBJECT_NOT_FOUND');else {
      return newSubject;
    }
  }

  async findList(where) {
    return await _models.Subject.findAll({});
  }

  async findOne(where) {
    return await _models.Subject.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

}

var _default = new SubjectService();

exports.default = _default;