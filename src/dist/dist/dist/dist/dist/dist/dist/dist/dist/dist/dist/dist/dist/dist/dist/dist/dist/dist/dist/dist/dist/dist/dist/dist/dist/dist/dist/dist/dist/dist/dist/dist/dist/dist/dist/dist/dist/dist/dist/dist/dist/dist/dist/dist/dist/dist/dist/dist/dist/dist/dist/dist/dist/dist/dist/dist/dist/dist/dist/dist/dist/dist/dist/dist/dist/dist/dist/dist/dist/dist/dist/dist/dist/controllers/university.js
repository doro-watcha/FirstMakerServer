"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

class UniversityController {
  static async findList(req, res) {
    var name = req.query.name;
    var line = req.query.line;
    const result = await _services.universityService.findList(name, line);
    const response = {
      success: true,
      data: {
        result
      }
    };
    res.send(response);
  }

  static async predict(req, res) {
    const name = req.body.name;
    const major = req.body.major;
    const line = req.body.line;
    const result = await _services.universityService.findByMajor(name, major, line);
    const response = {
      success: true,
      data: {
        result
      }
    };
    res.send(response);
  }

}

exports.default = UniversityController;