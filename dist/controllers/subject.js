"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class subjectController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        name: _joi.default.string().required()
      });
      const {
        name
      } = result;
      const modelObj = {
        name
      };
      const oldSubject = await _services.subjectService.findOne({
        name
      });
      if (oldSubject) throw Error('SUBJECT_ALREADY_EXISTS');
      const subject = await _services.subjectService.create(modelObj);
      const response = {
        success: true,
        data: {
          subject
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const where = {};
      const subjects = await _services.subjectService.findList(where);
      const response = {
        success: true,
        data: {
          subjects
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = subjectController;