"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class BlackListService {
  constructor() {
    if (!instance) {
      console.log('BlackListService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.BlackList.create(modelObj);
    const newBlackList = await _models.BlackList.findOne({
      where: modelObj
    });
    if (newBlackList == null) throw Error('BlACK_LIST_NOT_FOUND');else {
      return newBlackList;
    }
  }

  async findList(where) {
    return await _models.BlackList.findAll({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async findOne(where) {
    return await _models.BlackList.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

}

var _default = new BlackListService();

exports.default = _default;