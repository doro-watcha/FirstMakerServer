"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = require("../models");

var _crypto = require("crypto");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Op = _sequelize.default.Op;
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

  async findList(smallChapterId, number, minLevel, maxLevel) {
    return await _models.Problem.findAll({
      where: {
        smallChapterId,
        level: {
          [Op.and]: {
            [Op.lte]: maxLevel,
            [Op.gte]: minLevel
          }
        }
      },
      include: [{
        model: _models.BigChapter,
        as: 'bigChapter'
      }, {
        model: _models.MiddleChapter,
        as: 'middleChapter'
      }, {
        model: _models.SmallChapter,
        as: 'smallChapter'
      }],
      limit: number,
      order: _sequelize.default.literal('rand()')
    });
  }

  async findAdditionalList(smallChapterId, number, duplicatedIdList, minLevel, maxLevel) {
    return await _models.Problem.findAll({
      where: {
        smallChapterId,
        id: {
          [Op.notIn]: duplicatedIdList
        },
        level: {
          [Op.and]: {
            [Op.lte]: maxLevel,
            [Op.gte]: minLevel
          }
        }
      },
      include: [{
        model: _models.BigChapter,
        as: 'bigChapter'
      }, {
        model: _models.MiddleChapter,
        as: 'middleChapter'
      }, {
        model: _models.SmallChapter,
        as: 'smallChapter'
      }],
      limit: number,
      order: _sequelize.default.literal('rand()')
    });
  }

  async findOne(where) {
    return await _models.Problem.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: [{
        model: _models.BigChapter,
        as: 'bigChapter'
      }, {
        model: _models.MiddleChapter,
        as: 'middleChapter'
      }, {
        model: _models.SmallChapter,
        as: 'smallChapter'
      }, {
        model: _models.Subject,
        as: 'subject'
      }]
    });
  }

  async search(problemUrl, modelObj) {
    var problems = await _models.Problem.findAll({
      where: JSON.parse(JSON.stringify(modelObj)),
      include: [{
        model: _models.BigChapter,
        as: 'bigChapter'
      }, {
        model: _models.MiddleChapter,
        as: 'middleChapter'
      }, {
        model: _models.SmallChapter,
        as: 'smallChapter'
      }, {
        model: _models.Subject,
        as: 'subject'
      }]
    });
    console.log(problemUrl);

    if (problemUrl !== undefined) {
      problems = problems.filter(item => {
        console.log(item.problemUrl);
        return item.problemUrl.includes(problemUrl);
      });
    }

    return problems;
  }

  async update(id, modelObj) {
    await _models.Problem.update(modelObj, {
      where: {
        id
      }
    });
    const updatedProblem = await _models.Problem.findOne({
      where: {
        id
      }
    });
    if (updatedProblem === null) throw Error('PROBLEM_NOT_FOUOND');
    return updatedProblem;
  }

}

var _default = new ProblemService();

exports.default = _default;