"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _MiddleChapter = _interopRequireDefault(require("../models/MiddleChapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class middleChapterController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        bigChapterId: _joi.default.number().required(),
        name: _joi.default.string().required()
      });
      const {
        bigChapterId,
        name
      } = result;
      const modelObj = {
        bigChapterId,
        name
      };
      const newMiddleChapter = await _services.middleChapterService.create(modelObj);
      const response = {
        success: true,
        data: {
          middleChapter: newMiddleChapter
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
        bigChapterId: _joi.default.number()
      });
      const {
        bigChapterId
      } = result;
      const where = {
        bigChapterId
      };
      const middleChapters = await _services.middleChapterService.findList(where);
      const response = {
        success: true,
        data: {
          middleChapters
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = middleChapterController;