"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class studentController {
  static async create(req, res) {
    try {} catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const result = _joi.default.validate(req.query, {});

      const where = {};
      const students = await _services.studentService.findList(where);
      const response = {
        success: true,
        data: {
          students
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = studentController;