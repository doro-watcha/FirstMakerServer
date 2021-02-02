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

class homeworkController {
  static async create(req, res) {
    try {
      console.log("숙제를 만들어보자");
      const result = await _joi.default.validate(req.body, {
        problemIdList: _joi.default.array().required(),
        title: _joi.default.string().required(),
        numChapters: _joi.default.number().required(),
        mainChapter: _joi.default.string().required(),
        studentIdList: _joi.default.array().required()
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
        studentIdList
      } = result;

      for (let i = 0; i < studentIdList.length; i++) {
        const modelObj = {
          title,
          teacherId: teacher.id,
          studentId: studentIdList[i],
          numChapters,
          mainChapter
        };
        const newHomework = await _services.homeworkService.create(modelObj);

        for (let j = 0; j < problemIdList.length; j++) {
          const modelObj = {
            problemId: problemIdList[j],
            homeworkId: newHomework.id,
            studentId: studentIdList[i]
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
        studentId: _joi.default.number().required()
      });
      const {
        studentId
      } = result;
      const homeworkList = await _services.homeworkService.findList({
        studentId
      });
      const response = {
        success: true,
        data: {
          homeworkList
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
      const homework = await _services.homeworkService.findOne({
        id
      });
      if (homework == null) throw Error('HOMEWORK_NOT_FOUND');
      const response = {
        success: true,
        data: {
          homework
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
      await _services.homeworkService.update({
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

exports.default = homeworkController;