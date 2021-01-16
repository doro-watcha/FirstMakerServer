"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class WorkBookRecordService {
  constructor() {
    if (!instance) {
      console.log('WorkBookRecord Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.WorkBookRecord.create(modelObj);
    return true;
  }

  async findList(where) {
    return await _models.WorkBookRecord.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.WorkBook,
        as: 'workBook'
      }, {
        model: _models.BigChapter,
        as: 'bigChapter'
      }]
    });
  }

  async findOne(where) {
    return await _models.WorkBookRecord.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: {
        model: _models.WorkBook,
        as: 'workBook'
      }
    });
  }

}

var _default = new WorkBookRecordService();

exports.default = _default;