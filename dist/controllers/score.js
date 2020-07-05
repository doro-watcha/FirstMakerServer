"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class scoreController {
  static async createScore(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        korean: _joi.default.object().required(),
        math: _joi.default.object().required(),
        english: _joi.default.object().required(),
        tamgu1: _joi.default.object().required(),
        tamgu2: _joi.default.object().required(),
        history: _joi.default.object().required(),
        foreign: _joi.default.object().required(),
        line: _joi.default.string().required(),
        naesin: _joi.default.number(),
        naesin_type: _joi.default.string()
      });
      const {
        korean,
        math,
        english,
        tamgu1,
        tamgu2,
        history,
        foreign,
        line,
        naesin,
        naesin_type
      } = result;
      const {
        user
      } = req;
      const modelObj = {
        userId: user.id,
        korean,
        math,
        english,
        tamgu1,
        tamgu2,
        history,
        foreign,
        line,
        naesin,
        naesin_type
      };
      const score = await _services.scoreService.create(modelObj);
      const response = {
        success: true,
        data: {
          score
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async findScore(req, res) {
    try {
      const userId = req.params.userId;
      const score = await _services.scoreService.findByUserId(userId);
      if (score == null) throw Error('SCORE_NOT_FOUND');
      const response = {
        success: true,
        data: {
          score
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async updateScore(req, res) {
    try {
      const userId = req.params.userId;
      const result = await _joi.default.validate(req.body, {
        korean: _joi.default.object().required(),
        math: _joi.default.object().required(),
        english: _joi.default.object().required(),
        tamgu1: _joi.default.object().required(),
        tamgu2: _joi.default.object().required(),
        history: _joi.default.object().required(),
        foreign: _joi.default.object().required(),
        line: _joi.default.string().required(),
        naesin: _joi.default.number(),
        naesin_type: _joi.default.string()
      });
      const {
        korean,
        math,
        english,
        tamgu1,
        tamgu2,
        history,
        foreign,
        line,
        naesin,
        naesin_type
      } = result;
      const modelObj = {
        userId,
        korean,
        math,
        english,
        tamgu1,
        tamgu2,
        history,
        foreign,
        line,
        naesin,
        naesin_type
      };
      const score = await _services.scoreService.update(userId, modelObj);
      if (score == null) throw Error('SCORE_NOT_FOUND');
      const response = {
        success: true,
        data: {
          score
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async deleteScore(req, res) {
    try {
      const userId = req.params.userId;
      await _services.scoreService.delete(userId);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = scoreController;