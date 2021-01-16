"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _moment = _interopRequireDefault(require("moment"));

var _models = require("../models");

var _Problem = _interopRequireDefault(require("../models/Problem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class CollectionService {
  constructor() {
    if (!instance) {
      console.log('CollectionService 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    await _models.Collection.create(modelObj);
    const newCollection = await _models.Collection.findOne({
      where: JSON.parse(JSON.stringify(modelObj))
    });
    return newCollection;
  }

  async findList(userId, date) {
    const collections = await _models.Collection.findAll({
      where: {
        createdAt: {
          [_sequelize.default.Op.between]: [date, date.add(0, 'days').endOf('day').format()]
        },
        userId
      }
    });
    return collections;
  }

  async findOne(where) {
    return await _models.Collection.findOne({
      where: JSON.parse(JSON.stringify(where)),
      include: {
        model: _models.Note,
        as: 'note'
      }
    });
  }

}

var _default = new CollectionService();

exports.default = _default;