"use strict";

var _models = require("../models");

class UniversityService {
  async findByMajor(name, major, type) {
    return await _models.University.findOne({
      where: {
        name
      }
    });
  }

  async findOne(where) {
    return await Video.findOne({
      where
    });
  }

}