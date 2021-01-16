"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class BigChapterService {
  constructor() {
    if (!instance) {
      console.log('BigChapterService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.BigChapter.create(modelObj);
    const newBigChapter = await _models.BigChapter.findOne({
      where: {
        name: modelObj.name
      }
    });
    if (newBigChapter == null) throw Error('BIG_CHAPTER_NOT_FOUND');else {
      return newBigChapter;
    }
  }

  async findList(where) {
    return await _models.BigChapter.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include: {
        model: _models.MiddleChapter,
        as: 'middleChapter',
        include: {
          model: _models.SmallChapter,
          as: 'smallChapter'
        }
      }
    });
  }

  async findOne(where) {
    return await _models.BigChapter.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

}

var _default = new BigChapterService();

exports.default = _default;