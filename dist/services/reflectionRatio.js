"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

let instance = null;

class ReflectionRatioService {
  constructor() {
    if (!instance) {
      console.log('ReflectionRatio Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.ReflectionRatio.create(modelObj);
  }

  async findOne(id) {
    return await _models.ReflectionRatio.findOne({
      where: {
        id
      }
    });
  }

  async findByUnivId(univId) {
    return await _models.ReflectionRatio.findOne({
      where: {
        univId
      }
    });
  }

  async update(id, modelObj) {
    await _models.ReflectionRatio.update(modelObj, {
      where: {
        id
      }
    });
    const updateReflectionRatio = await _models.ReflectionRatio.findOne({
      where: {
        id
      }
    });
    if (updateReflectionRatio === null) throw Error('REFLECTION_RATIO_NOT_FOUND');
    return updateReflectionRatio;
  }

  async delete(id) {
    const reflectionRatio = await _models.ReflectionRatio.findOne({
      where: {
        id
      }
    });

    if (reflectionRatio == null) {
      throw Error('REFLEcTION_RATIO_NOT_FOUND');
    } else {
      await reflectionRatio.destroy();
    }
  }

}

var _default = new ReflectionRatioService();

exports.default = _default;