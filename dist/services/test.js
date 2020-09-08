"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

let instance = null;

class TestService {
  constructor() {
    if (!instance) {
      console.log('Test Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async create(modelObj) {
    return await _models.Test.create(modelObj);
  }

  async findAll() {
    return await _models.Test.findAll();
  }

  async deleteAll() {
    return await _models.Test.destroy({
      where: {}
    });
  }

  async update(id, modelObj) {
    return await _models.Test.update(modelObj, {
      where: {
        id
      }
    });
  }

}

var _default = new TestService();

exports.default = _default;