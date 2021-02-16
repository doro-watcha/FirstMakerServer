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

class SourceService {
  constructor() {
    if (!instance) {
      console.log('Source Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.Source.create(modelObj);
  }

  async findList(where) {
    return await _models.Source.findAll({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async findAll() {
    return await _models.Source.findAll();
  }

}

var _default = new SourceService();

exports.default = _default;