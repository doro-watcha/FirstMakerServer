"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _Problem = _interopRequireDefault(require("../models/Problem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class problemController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        problemUrl: _joi.default.string().required(),
        subjectId: _joi.default.number().required(),
        bigChapterId: _joi.default.number().required(),
        middleChapterId: _joi.default.number().required(),
        smallChapterId: _joi.default.number().required(),
        level: _joi.default.string().required()
      });
      const {
        problemUrl,
        subjectId,
        bigChapterId,
        middleChapterId,
        smallChapterId,
        level
      } = result;
      const modelObj = {
        problemUrl,
        subjectId,
        bigChapterId,
        middleChapterId,
        smallChapterId,
        level
      };
      const newProblem = await _services.problemService.create(modelObj);
      const response = {
        success: true,
        data: {
          problem: newProblem
        }
      };
      res.send(response);
    } catch {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        smallChapterIdList: _joi.default.array(),
        numberList: _joi.default.array()
      });
      const {
        smallChapterIdList,
        numberList
      } = result;
      var totalProblems = [];

      for (var i = 0; i < smallChapterIdList.length; i++) {
        var problems = await _services.problemService.findList(smallChapterIdList[i], numberList[i]);
        totalProblems.push(problems);
      }

      const response = {
        success: true,
        data: {
          totalProblems
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = problemController;