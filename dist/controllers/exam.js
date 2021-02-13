"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class examController {
  static async create(req, res) {
    try {
      console.log("시험을 만들어보자");
      const result = await _joi.default.validate(req.body, {
        problemIdList: _joi.default.array().required(),
        title: _joi.default.string().required(),
        numChapters: _joi.default.number().required(),
        mainChapter: _joi.default.string().required(),
        userIdList: _joi.default.array().required(),
        timeLimit: _joi.default.number().required()
      });
      const {
        user
      } = req;
      const teacher = await _services.teacherService.findOne({
        userId: user.id
      });
      const {
        problemIdList,
        title,
        numChapters,
        mainChapter,
        userIdList,
        timeLimit
      } = result;
      if (timeLimit === undefined) throw Error('TIME_LIMIT_NOT_FOUND');

      for (let i = 0; i < userIdList.length; i++) {
        const modelObj = {
          title,
          teacherId: teacher.id,
          userId: userIdList[i],
          numChapters,
          mainChapter,
          timeLimit
        };
        const newExam = await _services.examService.create(modelObj);

        for (let j = 0; j < problemIdList.length; j++) {
          const modelObj = {
            problemId: problemIdList[j],
            examId: newExam.id,
            userId: userIdList[i]
          };
          await _services.noteService.create(modelObj);
        }
      }

      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        userId: _joi.default.number().required()
      });
      const {
        userId
      } = result;
      const examList = await _services.examService.findList({
        userId
      });
      const response = {
        success: true,
        data: {
          examList
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findOne(req, res) {
    try {
      const id = req.params.id;
      const exam = await _services.examService.findOne({
        id
      });
      if (exam == null) throw Error('EXAM_NOT_FOUND');
      const response = {
        success: true,
        data: {
          exam
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(E));
    }
  }

  static async update(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        status: _joi.default.optional()
      });
      const {
        status
      } = result;
      await _services.examService.update({
        status
      });
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = examController;