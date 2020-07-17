"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

let instance = null;

class AcademyService {
  constructor() {
    if (!instance) {
      console.log('Academy Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    // hash password
    if (modelObj.password) modelObj.password = _models.Academy.hashPassword(modelObj.password);
    return await _models.Academy.create(modelObj);
  }

  async findList(where) {
    return _models.Academy.findAll({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async findOne(where) {
    return await _models.Academy.findOne({
      where: JSON.parse(JSON.stringify(where))
    });
  }

  async update(id, modelObj) {
    await _models.Academy.update(modelObj, {
      where: {
        id
      }
    });
    const updatedAcademy = await _models.Academy.findOne({
      where: {
        id
      }
    });
    if (updatedAcademy === null) throw Error('ACADEMY_NOT_FOUND');
    return updatedAcademy;
  }

  async delete(id) {
    const academy = await _models.Academy.findOne({
      where: {
        id
      }
    });

    if (academy == null) {
      throw Error('ACADEMY_NOT_FOUND');
    } else {
      await academy.destroy();
    }
  }

}

var _default = new AcademyService();

exports.default = _default;