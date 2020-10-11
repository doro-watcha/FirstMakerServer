"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _BigChapter = _interopRequireDefault(require("../models/BigChapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class bigChapterController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        subjectId: _joi.default.number().required(),
        name: _joi.default.string().required()
      });
      const {
        subjectId,
        name
      } = result;
      const modelObj = {
        subjectId,
        name
      };
      const newBigChaper = await _services.bigChapterService.create(modelObj);
      const response = {
        success: true,
        data: {
          bigChapter: newBigChaper
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findOne(req, res) {}

  static async findList(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        subjectId: _joi.default.number()
      });
      const {
        subjectId
      } = result;
      const where = {
        subjectId
      };
      const bigChapters = await _services.bigChapterService.findList(where);
      const response = {
        success: true,
        data: {
          bigChapters
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = bigChapterController;