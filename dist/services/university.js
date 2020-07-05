"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

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

  async findAll() {
    return await _models.University.findAll({
      attributes: ['name', 'min', 'max', 'group']
    });
  }

  async findOne(id) {
    return await _models.University.findOne({
      where: {
        id
      }
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

}

var _default = new UniversityService();

exports.default = _default;