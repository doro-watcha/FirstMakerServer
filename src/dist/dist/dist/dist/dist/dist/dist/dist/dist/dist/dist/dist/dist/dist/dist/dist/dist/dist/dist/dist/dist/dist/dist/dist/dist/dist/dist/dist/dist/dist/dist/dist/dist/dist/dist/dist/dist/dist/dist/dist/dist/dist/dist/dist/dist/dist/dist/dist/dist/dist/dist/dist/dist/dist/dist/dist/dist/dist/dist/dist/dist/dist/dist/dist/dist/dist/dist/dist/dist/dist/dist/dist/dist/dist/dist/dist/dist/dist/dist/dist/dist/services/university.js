"use strict";

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