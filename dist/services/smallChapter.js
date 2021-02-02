"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class SmallChapterService {
  constructor() {
    if (!instance) {
      console.log('SmallChapterService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.SmallChapter.create(modelObj);
    const newSmallChapter = await _models.SmallChapter.findOne({
      where: {
        name: modelObj.name
      }
    });
    if (newSmallChapter == null) throw Error('SMALL_CHAPTER_NOT_FOUND');else {
      return newSmallChapter;
    }
  }

  async findList(where) {
    return await _models.SmallChapter.findAll({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async findOne(where) {
    return await _models.SmallChapter.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async delete(id) {
    return await _models.SmallChapter.destroy({
      where: {
        id
      }
    });
  }

}

var _default = new SmallChapterService();

exports.default = _default;