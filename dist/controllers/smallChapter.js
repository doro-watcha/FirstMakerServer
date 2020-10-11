"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

var _SmallChapter = _interopRequireDefault(require("../models/SmallChapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class smallChapterController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        middleChapterId: _joi.default.number().required(),
        name: _joi.default.string().required()
      });
      const {
        middleChapterId,
        name
      } = result;
      const modelObj = {
        middleChapterId,
        name
      };
      const newSmallChapter = await _services.smallChapterService.create(modelObj);
      const response = {
        success: true,
        data: {
          smallChapter: newSmallChapter
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
        middleChapterId: _joi.default.number()
      });
      const {
        middleChapterId
      } = result;
      const where = {
        middleChapterId
      };
      const smallChapters = await _services.smallChapterService.findList(where);
      const response = {
        success: true,
        data: {
          smallChapters
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = smallChapterController;