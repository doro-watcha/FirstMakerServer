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
        type: _joi.default.string().required()
      });
      const {
        korean,
        math,
        english,
        tamgu1,
        tamgu2,
        history,
        type
      } = result;
      const {
        user
      } = req;
      const modelObj = {
        userId: user.id,
        korean_score: korean.score,
        korean_grade: korean.grade,
        korean_percentile: korean.percentile,
        english_grade: english.grade,
        math_score: math.score,
        math_grade: math.grade,
        math_percentile: math.percentile,
        tamgu1_score: tamgu1.score,
        tamgu1_grade: tamgu1.grade,
        tamgu1_percentile: tamgu1.percentile,
        tamgu2_score: tamgu2.score,
        tamgu2_grade: tamgu2.grade,
        tamgu2_percentile: tamgu2.percentile,
        history_grade: history.grade,
        type: type
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
          korean: {
            score: score.korean_score,
            grade: score.korean_grade,
            percentile: score.korean_percentile
          },
          english: {
            grade: score.english_grade
          },
          math: {
            score: score.math_score,
            grade: score.math_grade,
            percentile: score.math_percentile
          },
          tamgu1: {
            score: score.tamgu1_score,
            grade: score.tamgu1_grade,
            percentile: score.tamgu1_percentile
          },
          tamgu2: {
            score: score.tamgu2_score,
            grade: score.tamgu2_grade,
            percentile: score.tamgu2_percentile
          },
          history: {
            history: score.history_grade
          }
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
        korean: _joi.default.object(),
        math: _joi.default.object(),
        english: _joi.default.object(),
        tamgu1: _joi.default.object(),
        tamgu2: _joi.default.object(),
        history: _joi.default.object(),
        type: _joi.default.string()
      });
      const {
        korean,
        math,
        english,
        tamgu1,
        tamgu2,
        history,
        type
      } = result;
      const modelObj = {
        userId: userId,
        korean_score: korean.score,
        korean_grade: korean.grade,
        korean_percentile: korean.percentile,
        english_grade: english.grade,
        math_score: math.score,
        math_grade: math.grade,
        math_percentile: math.percentile,
        tamgu1_score: tamgu1.score,
        tamgu1_grade: tamgu1.grade,
        tamgu1_percentile: tamgu1.percentile,
        tamgu2_score: tamgu2.score,
        tamgu2_grade: tamgu2.grade,
        tamgu2_percentile: tamgu2.percentile,
        history_grade: history.grade,
        type: type
      };
      const score = await _services.scoreService.update(userId, modelObj);
      if (score == null) throw Error('SCORE_NOT_FOUND');
      const response = {
        success: true,
        data: {
          score: score
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