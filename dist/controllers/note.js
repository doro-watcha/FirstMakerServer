"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _Note = _interopRequireDefault(require("../models/Note"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class noteController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        homeworkId: _joi.default.number(),
        examId: _joi.default.number(),
        problemId: _joi.default.number().required()
      });
      const {
        homeworkId,
        examId,
        problemId
      } = result;
      const modelObj = {
        homeworkId,
        examId,
        problemId
      };
      const newNote = await _services.noteService.create(modelObj);
      const response = {
        success: true,
        data: {
          note: newNote
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {} catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = noteController;