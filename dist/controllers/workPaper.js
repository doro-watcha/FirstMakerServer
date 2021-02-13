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

class workPaperController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        problemIdList: _joi.default.array().required(),
        title: _joi.default.string().required(),
        numChapters: _joi.default.number().required(),
        mainChapter: _joi.default.string().required()
      });
      const {
        user
      } = req;
      const {
        problemIdList,
        title,
        numChapters,
        mainChapter
      } = result;
      const modelObj = {
        title,
        userId: user.id,
        numChapters,
        mainChapter
      };
      const newWorkPaper = await _services.workPaperService.create(modelObj);

      for (var i = 0; i < problemIdList.length; i++) {
        const modelObj = {
          problemId: problemIdList[i],
          workPaperId: newWorkPaper.id,
          userId: user.id
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

  static async findOne(req, res) {
    try {
      const id = req.params.id;
      const workPaper = await _services.workPaperService.findOne({
        id
      });
      const response = {
        success: true,
        data: {
          workPaper
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findList(req, res) {
    try {
      const {
        user
      } = req;
      const workPapers = await _services.workPaperService.findList({
        userId: user.id
      });
      const response = {
        success: true,
        data: {
          workPapers
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      await _services.workPaperService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = workPaperController;