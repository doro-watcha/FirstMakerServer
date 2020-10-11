"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

var _crypto = require("crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class ProblemService {
  constructor() {
    if (!instance) {
      console.log('ProblemService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.Problem.create(modelObj);
  }

  async findList(smallChapterId, number) {
    return await _models.Problem.findAll({
      where: {
        smallChapterId
      },
      limit: number,
      order: _sequelize.default.literal('rand()')
    });
  }

  async findOne(where) {
    return await _models.Problem.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

}

var _default = new ProblemService();

exports.default = _default;