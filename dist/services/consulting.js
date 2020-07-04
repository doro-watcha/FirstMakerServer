"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

let instance = null;

class ConsultingService {
  constructor() {
    if (!instance) {
      console.log('Consulting Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    const {
      studentId
    } = modelObj;
    const student = await _models.User.findOne({
      where: {
        id: studentId
      }
    });
    if (student == null) throw Error('USER_NOT_FOUND');else {
      return await _models.Consulting.create(modelObj);
    }
  }

  async findAll() {
    return _models.Consulting.findAll();
  }

  async findOne(id) {
    return _models.Consulting.findOne({
      where: {
        id
      }
    });
  }

  async update(id, modelObj) {
    await _models.Consulting.update(modelObj, {
      where: {
        id
      }
    });
    const updatedConsulting = await _models.Consulting.findOne({
      where: {
        id
      }
    });
    if (updatedConsulting === null) throw Error('CONSULTING_NOT_FOUND');
    return updatedConsulting;
  }

  async delete(id) {
    const consulting = await _models.Consulting.findOne({
      where: {
        id
      }
    });

    if (consulting == null) {
      throw Error('CONSULTING_NOT_FOUND');
    } else {
      await consulting.destroy();
    }
  }

}

var _default = new ConsultingService();

exports.default = _default;