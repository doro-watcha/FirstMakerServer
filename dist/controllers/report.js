"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _functions = require("../utils/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class reportController {
  static async create(req, res) {
    try {
      const {
        user
      } = req;
      const result = await _joi.default.validate(req.body, {
        majorDataId: _joi.default.number()
      });
      const {
        majorDataId
      } = result;
      const already_report = await _services.reportService.findOne({
        majorDataId,
        userId: user.id
      });
      if (already_report != null) throw Error('REPORT_ALREADY_EXISTS');
      const majorData = await _services.majorDataService.findOne({
        id: majorDataId
      });
      if (majorData == null) throw Error('MAJOR_DATA_NOT_FOUND');
      const score = await _services.scoreService.findOne({
        userId: user.id
      });
      if (score == null) throw Error('SCORE_NOT_FOUND'); // 과목별 변환 만점 구하기 

      const major_perfectScore = majorData.metadata.perfectScore;
      const major_ratio = majorData.ratio;
      const perfectScore = {
        korean: major_perfectScore * (major_ratio.korean / 100),
        english: major_perfectScore * (major_ratio.englsih / 100),
        math: 0,
        tamgu: 0
      };
      const math_type = score.math.type;
      const tamgu_type = score.line;

      if (math_type == "가") {
        perfectScore.math = major_perfectScore * (major_ratio.math.ga / 100);
      } else if (math_type == "나") {
        perfectScore.math = major_perfectScore * (major_ratio.math.na / 100);
      }

      if (tamgu_type == "자연") {
        perfectScore.tamgu = major_perfectScore * (major_ratio.tamgu.science / 100);
      } else if (tamgu_type == "인문") {
        perfectScore.tamgu = major_perfectScore * (major_ratio.tamgu.society / 100);
      } // 내 변환 점수 구하기


      const applicationIndicator = majorData.metadata.applicationIndicator;
      const english = score.english.grade;
      const newScore = {
        korean: 0,
        math: 0,
        english: 0,
        tamgu: 0,
        history: 0
      };
      newScore.english = majorData.gradeToScore.english.score[english] * (perfectScore.english / 200);

      if (applicationIndicator == "표준점수") {
        newScore.korean = score.korean.score * (perfectScore.korean / 200);
        newScore.math = score.math.score * (perfectScore.math / 200);
        newScore.tamgu = (score.tamgu1.score + score.tamgu2.score) * (perfectScore.tamgu / 200);
      } else if (applicationIndicator == "표+백") {
        newScore.korean = score.korean.score * (perfectScore.korean / 200);
        newScore.math = score.math.score * (perfectScore.math / 200);
        newScore.tamgu = (score.tamgu1.grade + score.tamgu2.grade) * (perfectScore.tamgu / 200);
      } else if (applicationIndicator == "백분위") {
        newScore.korean = score.korean.grade * (perfectScore.korean / 200);
        newScore.math = score.math.grade * (perfectScore.math / 200);
        newScore.tamgu = (score.tamgu1.grade + score.tamgu2.grade) * (perfectScore.tamgu / 200);
      } // 변환 가산점 구하기 


      const extra = majorData.metadata.extraPoint;
      const extra_subject = {
        math_ga_5: "수가 5%",
        math_ga_10: "수가 10&",
        science: "과탐",
        science_1: "윤리"
      }; // for ( let i = 0 ; i < 3 ; i++){
      //   if ( extra.indexOf(extra_subject[i]) >= 0 ) {
      //   }
      // }

      const modelObj = {
        score,
        majorDataId,
        userId: user.id,
        perfectScore,
        score: newScore,
        extraScore: null
      };
      const report = await _services.reportService.create(modelObj);
      const response = {
        success: true,
        data: {
          report
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
      const report = await _services.reportService.findOne({
        id
      });
      if (report == null) throw Error('REPORT_NOT_FOUND');
      const response = {
        success: true,
        data: {
          report
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
      const reports = await _services.reportService.findList(user.id);
      const response = {
        success: true,
        data: {
          reports
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
        score: _joi.default.number(),
        majorDataId: _joi.default.number(),
        userId: _joi.default.number()
      });
      const {
        score,
        majorDataId,
        userId
      } = result;
      const modelObj = {
        score,
        majorDataId,
        userId
      };
      const updateReport = await _services.reportService.update(id, modelObj);
      const response = {
        success: true,
        data: {
          updateReport
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
      await _services.reportService.delete(id);
      const response = {
        success: true
      };
      res.send(response);
    } catch (e) {
      res.send((0, _functions.createErrorResponse)(e));
    }
  }

}

exports.default = reportController;