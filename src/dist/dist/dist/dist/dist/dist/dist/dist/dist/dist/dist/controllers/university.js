"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

class UniversityController {
  static async predict(req, res) {
    const name = req.body.name;
    const major = req.body.major;
    const type = req.body.type;
    console.log(name);
    console.log(major);
    console.log(type);
    const result = await _services.universityService.findByMajor(name, major, type);
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