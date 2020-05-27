"use strict";

var _models = require("../models");

class UniversityService {
  async findByMajor(name, major, type) {
    return await _models.University.findOne({
      where: {
        name,
        major,
        type
      }
    });
  }

  async findOne(where) {
    return await Video.findOne({
      where
    });
  }

}