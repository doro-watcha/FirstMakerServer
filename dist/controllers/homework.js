"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _Homework = _interopRequireDefault(require("../models/Homework"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class homeworkController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        problemIdList: _joi.default.array.required(),
        dueDate: _joi.default.date.required(),
        name: _joi.default.string()
      });
      const {
        user
      } = req.user;
      const {
        problemIdList,
        dueDate
      } = result;
      const homeworkObj = {
        name,
        dueDate,
        authorId: user.id
      };
      const oldHomework = await _services.homeworkService.findOne(homeworkObj); // 마감날짜와 숙제 이름이 같으면 이미 존재한다고 판단

      if (oldHomework) throw Error('HOMEWORK_ALREADY_EXISTS');
      const newHomework = await _services.homeworkService.create(homeworkObj);

      for (var i = 0; i < problemIdList.length(); i++) {
        const modelObj = {
          problemId: problemIdList[i],
          homeworkId: newHomework.id
        };
        await _services.noteService.create(modelObj);
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
    try {} catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = homeworkController;