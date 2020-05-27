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

  async findByMajor(name, major, line) {
    console.log("fuck");
    return await _models.University.findOne({
      where: {
        name,
        major,
        line
      },
      attributes: ["strong_val", "safe_val", "dangerous_val", "sniping_val"]
    });
  }

  async findList(name, line) {
    return await _models.University.findAll({
      where: {
        name,
        line
      }
    });
  }

}

var _default = new UniversityService();

exports.default = _default;