"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class reflectionRatioController {
  static async create(req, res) {
    try {
      const result = await _joi.default.validate(req.body, {
        metadata: _joi.default.object().required(),
        ratio: _joi.default.object().required(),
        description: _joi.default.object().required(),
        minGrade: _joi.default.object().required(),
        extraRatio: _joi.default.object().required(),
        perfectScore: _joi.default.object().required(),
        totalScore: _joi.default.number().required(),
        gradeToScore: _joi.default.object().required(),
        univId: _joi.default.number().required()
      });
      /* meta data = { applicationIndicator, reflectionSubject, reflectionNumber , applyingNumber }
       */

      const {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      } = result;
      const modelObj = {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      };
      const exist_reflection_ratio = await _services.reflectionRatioService.findByUnivId(univId);
      if (exist_reflection_ratio != null) throw Error('REFLECTION_RATIO_ALREADY_EXISTS');
      const reflectionRatio = await _services.reflectionRatioService.create(modelObj);
      const response = {
        success: true,
        data: {
          reflectionRatio
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
      const reflectionRatio = await _services.reflectionRatioService.findOne(id);
      const response = {
        success: true,
        data: {
          reflectionRatio
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async calculate(req, res) {
    try {
      const result = await _joi.default.validate(req.query, {
        univId: _joi.default.number().required(),
        userId: _joi.default.number().required()
      });
      const {
        univId,
        userId
      } = result;
      const reflectionRatio = await _services.reflectionRatioService.findByUnivId(univId);
      const score = await _services.scoreService.findByUserId(userId);
      const perfectScore = {
        "korean": reflectionRatio.totalScore * (reflectionRatio.ratio.korean / 100),
        "math": reflectionRatio.totalScore * (reflectionRatio.ratio.math / 100),
        "english": reflectionRatio.totalScore * (reflectionRatio.ratio.english / 100),
        "tamgu": reflectionRatio.totalScore * (reflectionRatio.ratio.tamgu / 100)
      }; // 영어를 등급에서 점수로 변환해준다

      const new_english = reflectionRatio.gradeToScore.english[score.english.grade - 1]; // 제 2외국어가 탐구 한 과목으로 대체가 가능하다면 점수가 높을시에만 바꿔준다

      if (reflectionRatio.metadata.isForeignIncluded == true) {
        if (score.tamgu1.score > score.foreign.score) {
          if (score.tamgu1.score > score.tamgu2.score) score.tamgu2 = score.foreign;else if (score.tamgu1.score < score.tamgu2.score) score.tamgu1 = score.foreign;
        } else if (score.foreign.score > score.tamgu2.score) {
          score.tamgu2 = score.foreign;
        }
      }

      const new_tamgu = score.tamgu1.score + score.tamgu2.score;
      const calculated = {
        "korean": score.korean.score * (perfectScore.korean / reflectionRatio.perfectScore.korean),
        "math": score.math.score * (perfectScore.math / reflectionRatio.perfectScore.math),
        "english": new_english * (perfectScore.english / reflectionRatio.perfectScore.english),
        "tamgu": new_tamgu * (perfectScore.tamgu / reflectionRatio.perfectScore.tamgu)
      };
      const tamgu_extra = score.tamgu1.score * (reflectionRatio.extraRatio.tamgu[score.tamgu1.name] / 100) + score.tamgu2.score * (reflectionRatio.extraRatio.tamgu[score.tamgu2.name] / 100);
      const extra = {
        "korean": calculated.korean * (reflectionRatio.extraRatio.korean / 100),
        "math": calculated.math * (reflectionRatio.extraRatio.math[score.math.type] / 100),
        "english": calculated.english * (reflectionRatio.extraRatio.english / 100),
        "tamgu": tamgu_extra,
        "history": reflectionRatio.gradeToScore.history[score.history.grade - 1],
        "foreign": score.fo
      }; // 표+백 일경우에 재껴줘야함

      if (reflectionRatio.metadata.applicationIndicator == "표+백") {
        console.log("fuckman~");
      } // 영어가 가감일경우에도 처리해줘야함


      const calculatedScore = {
        "korean": {
          "score": calculated.korean,
          "extra": extra.korean,
          "perfect": perfectScore.korean
        },
        "math": {
          "score": calculated.math,
          "extra": extra.math,
          "perfect": perfectScore.math
        },
        "english": {
          "score": calculated.english,
          "extra": extra.english,
          "perfect": perfectScore.english
        },
        "tamgu": {
          "score": calculated.tamgu,
          "extra": extra.tamgu,
          "perfect": perfectScore.tamgu
        },
        "history": {
          "extra": extra.history
        }
      };
      const response = {
        success: true,
        data: {
          reflectionRatio,
          score,
          calculatedScore
        }
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const result = await _joi.default.validate(req.body, {
        metadata: _joi.default.object().required(),
        ratio: _joi.default.object().required(),
        description: _joi.default.object().required(),
        minGrade: _joi.default.object().required(),
        extraRatio: _joi.default.object().required(),
        perfectScore: _joi.default.object().required(),
        totalScore: _joi.default.number().required(),
        gradeToScore: _joi.default.object().required(),
        univId: _joi.default.number().required()
      });
      /* meta data = { applicationIndicator, reflectionSubject, reflectionNumber , applyingNumber }
       */

      const {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      } = result;
      const modelObj = {
        metadata,
        ratio,
        description,
        minGrade,
        extraRatio,
        perfectScore,
        totalScore,
        gradeToScore,
        univId
      };
      const reflectionRatio = await _services.reflectionRatioService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          reflectionRatio
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
      await _services.reflectionRatioService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = reflectionRatioController;