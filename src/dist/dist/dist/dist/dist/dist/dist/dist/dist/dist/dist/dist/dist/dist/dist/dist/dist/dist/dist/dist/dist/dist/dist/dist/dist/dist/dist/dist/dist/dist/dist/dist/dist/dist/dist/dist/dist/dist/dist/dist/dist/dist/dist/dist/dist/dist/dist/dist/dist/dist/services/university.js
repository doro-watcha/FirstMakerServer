"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

class UniversityService {
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