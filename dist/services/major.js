"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

let instance = null;

class MajorService {
  constructor() {
    if (!instance) {
      console.log('Majfor Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.Major.create(modelObj);
  }

  async findList(univId, line) {
    return await _models.Major.findAll({
      where: {
        univId,
        line
      }
    });
  }

  async findByName(name, univId) {
    return await _models.Major.findOne({
      where: {
        name,
        univId
      }
    });
  }

  async findAll() {
    return await _models.Major.findAll({});
  }

  async update(id, modelObj) {
    await _models.Major.update(modelObj, {
      where: {
        id
      }
    });
    const updatedMajor = await _models.Major.findOne({
      where: {
        id
      }
    });
    if (updatedMajor === null) throw Error('MAJOR_NOT_FOUND');
    return updatedMajor;
  }

  async delete(id) {
    const major = await _models.Major.findOne({
      where: {
        id
      }
    });

    if (major == null) {
      throw Error('MAJOR_NOT_FOUND');
    } else {
      await major.destroy();
    }
  }

}

var _default = new MajorService();

exports.default = _default;