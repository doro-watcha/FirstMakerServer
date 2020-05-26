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

  async findByMajor(name, major, type) {
    console.log("fuck");
    return await _models.University.findOne({
      where: {
        name,
        major,
        type
      },
      attributes: ["strong_val", safe_val, dangerous_val, sniping_val]
    });
  }

}

var _default = new UniversityService();

exports.default = _default;