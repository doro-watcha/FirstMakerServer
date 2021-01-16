"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class MiddleChapterService {
  constructor() {
    if (!instance) {
      console.log('MiddleChapterService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.MiddleChapter.create(modelObj);
    const newMiddleChapter = await _models.MiddleChapter.findOne({
      where: {
        name: modelObj.name
      }
    });
    if (newMiddleChapter == null) throw Error('MIDDLE_CHAPTER_NOT_FOUND');else {
      return newMiddleChapter;
    }
  }

  async findList(where) {
    return await _models.MiddleChapter.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include: {
        model: _models.SmallChapter,
        as: 'smallChapter'
      }
    });
  }

  async findOne(where) {
    return await _models.MiddleChapter.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

}

var _default = new MiddleChapterService();

exports.default = _default;