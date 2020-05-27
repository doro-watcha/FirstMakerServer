"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _validatorExtras = require("sequelize/types/lib/utils/validator-extras");

let instance = null;

class UniversityService {
  constructor() {
    if (!instance) {
      console.log('University Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async findByMajor(name, major, type) {
    console.log("fuck");
    return await _models.University.findOne({
      where: {
        name
      }
    });
  }

}

var _default = new UniversityService();

exports.default = _default;