"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let instance = null;

class UniversityService {
  constructor() {
    if (!instance) {
      console.log('University Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.University.create(modelObj);
  }

  async findList(where) {
    return await _models.University.findAll({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async findOne(where) {
    return await _models.University.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async update(id, modelObj) {
    await _models.University.update(modelObj, {
      where: {
        id
      }
    });
    const updatedUniversity = await _models.University.findOne({
      where: {
        id
      }
    });
    if (updatedUniversity === null) throw Error('UNIVERSITY_NOT_FOUND');
    return updatedUniversity;
  }

  async delete(id) {
    const university = await _models.University.findOne({
      where: {
        id
      }
    });
    if (university == null) throw Error('UNIVERSITY_NOT_FOUND');else {
      await university.destroy();
    }
  }

  async deleteAll() {
    // let query = `ALTER TABLE Universities AUTO_INCREMENT = 1;`
    // await sequelize.query(query)
    return await _models.University.destroy({
      where: {}
    });
  }

}

var _default = new UniversityService();

exports.default = _default;