"use strict";

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

  async findOne(where) {
    return await _models.Homework.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

}