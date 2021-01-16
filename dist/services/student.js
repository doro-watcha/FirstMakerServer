"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class StudentService {
  constructor() {
    if (!instance) {
      console.log('Student Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.Student.create(modelObj);
  }

  async findList(where) {
    return await _models.Student.findAll({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async findOne(where) {
    return await _models.Student.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

}

var _default = new StudentService();

exports.default = _default;