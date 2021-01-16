"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class WorkPaperService {
  constructor() {
    if (!instance) {
      console.log('WorkPaperService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.WorkPaper.create(modelObj);

    const newWorkPaper = _models.WorkPaper.findOne({
      where: modelObj
    });

    return newWorkPaper;
  }

  async findList(where) {
    return await _models.WorkPaper.findAll({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.Note,
        as: 'note',
        include: [{
          model: _models.Problem,
          as: 'problem',
          include: [{
            model: _models.BigChapter,
            as: 'bigChapter'
          }, {
            model: _models.MiddleChapter,
            as: 'middleChapter'
          }, {
            model: _models.SmallChapter,
            as: 'smallChapter'
          }]
        }]
      }]
    });
  }

  async findOne(where) {
    return await _models.WorkPaper.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.Note,
        as: 'note',
        include: [{
          model: _models.Problem,
          as: 'problem',
          include: [{
            model: _models.BigChapter,
            as: 'bigChapter'
          }, {
            model: _models.MiddleChapter,
            as: 'middleChapter'
          }, {
            model: _models.SmallChapter,
            as: 'smallChapter'
          }]
        }]
      }]
    });
  }

  async delete(id) {
    const workPaper = await _models.WorkPaper.findOne({
      where: id
    });

    if (workPaper == null) {
      throw Error('WORK_PAPER_NOT_FOUND');
    } else {
      await workPaper.destroy();
    }
  }

  async update(id, modelObj) {
    await _models.WorkPaper.update(modelObj, {
      where: {
        id
      }
    });
    const workPaper = await _models.WorkPaper.findOne({
      id
    });
    if (workPaper == null) throw Error('WORK_PAPER_NOT_FOUND');
    return workPaper;
  }

}

var _default = new WorkPaperService();

exports.default = _default;