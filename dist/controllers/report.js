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
        majorDataId: _joi.default.number().required()
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
      if (score == null) throw Error('SCORE_NOT_FOUND');
      console.log("zxcvzxcv");
      const modelObj = await reportController.getScore(score, majorData, true);
      const report = await _services.reportService.create(modelObj);
      console.log("FUCK");
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
      const response = {
        success: true
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

  static async compare(a, b) {
    return b - a;
  }

  static async getScore(score, majorData, create) {
    // ApplicationIndicator??? ???????????? ????????? ( ex: ?????????,???????????? ??????)
    // ????????? ?????? ?????? ????????? ex) 700 ,1000
    const major_perfectScore = majorData.metadata.perfectScore;
    const major_ratio = majorData.ratio;
    const perfectScore = {
      korean: major_perfectScore * (major_ratio.korean / 100),
      english: major_perfectScore * (major_ratio.english / 100),
      math: 0,
      tamgu: 0,
      history: major_perfectScore * (major_ratio.history / 100)
    };
    const math_type = score.math.type;
    const tamgu_type = score.line;

    if (math_type == "???") {
      perfectScore.math = major_perfectScore * (major_ratio.math.ga / 100);
    } else if (math_type == "???") {
      perfectScore.math = major_perfectScore * (major_ratio.math.na / 100);
    }

    if (tamgu_type == "??????") {
      perfectScore.tamgu = major_perfectScore * (major_ratio.tamgu.science / 100);
    } else {
      perfectScore.tamgu = major_perfectScore * (major_ratio.tamgu.society / 100);
    } // ?????? ????????? ????????? ?????? ?????? ????????? 


    const ratio = majorData.ratio;
    const reflectionSubject = majorData.metadata.reflectionSubject;
    const newRatio = {
      korean: ratio.korean,
      math: 0,
      englsih: ratio.english,
      tamgu: 0,
      history: ratio.history
    }; // ?????? ???????????? ?????? ????????? 

    if (score.math.type == "???") {
      newRatio.math = ratio.math.ga;
    } else if (score.math.type == "???") {
      newRatio.math = ratio.math.na;
    } // ?????? ???????????? ?????? ?????????


    if (score.line == "??????") {
      newRatio.tamgu = ratio.tamgu.society;
    } else {
      newRatio.tamgu = ratio.tamgu.science;
    } // ????????? ?????? ?????? ?????? ????????????


    const applicationIndicator = majorData.metadata.applicationIndicator;
    const newScore = {
      korean: 0,
      english: 0,
      tamgu: 0,
      math: 0,
      history: 0
    };

    if (applicationIndicator == "????????????") {
      newScore.korean = score.korean.score * perfectScore.korean / 200;
      newScore.math = score.math.score * perfectScore.math / 200;
      newScore.tamgu = (score.tamgu1.score + score.tamgu2.score) * perfectScore.tamgu / 200;
      newScore.english = majorData.gradeToScore.english.score[score.english.grade - 1] * perfectScore.english / 200;
      newScore.history = majorData.gradeToScore.history.score[score.history.grade - 1] * perfectScore.history / 200;
    } else if (applicationIndicator == "???+???") {
      newScore.korean = score.korean.score * (perfectScore.korean / 200);
      newScore.math = score.math.score * (perfectScore.math / 200);
      newScore.tamgu = (score.tamgu1.grade + score.tamgu2.grade) * (perfectScore.tamgu / 200);
      newScore.english = majorData.gradeToScore.english.score[score.english.grade - 1] * perfectScore.english / 200;
      newScore.history = majorData.gradeToScore.history.score[score.history.grade - 1] * perfectScore.history / 200;
    } else if (applicationIndicator == "?????????") {
      newScore.korean = score.korean.percentile * perfectScore.korean / 100;
      newScore.math = score.math.percentile * perfectScore.math / 100;
      newScore.tamgu = (score.tamgu1.percentile + score.tamgu2.percentile) / 2 * perfectScore.tamgu / 100;
      newScore.english = majorData.gradeToScore.english.score[score.english.grade - 1] * perfectScore.english / 100;
      newScore.history = majorData.gradeToScore.history.score[score.history.grade - 1] * perfectScore.history / 100;
    } // ?????? ????????? ????????? 


    const extra = majorData.metadata.extraPoint;
    const extraScore = {
      korean: 0,
      english: 0,
      math: 0,
      tamgu: 0,
      history: 0
    };

    if (extra.indexOf("??????") >= 0 && math_type == "???") {
      if (extra.indexOf("%") >= 0) {
        const number = extra.replace(/[^0-9]/g, '');
        extraScore.math = newScore.math * number / 100;
      }
    }

    if (extra.indexOf("??????") >= 0 && extra.indexOf("%") >= 0 && math_type == "???") {
      const number = extra.replace(/[^0-9]/g, '');
      extraScore.math = -newScore.math * number / 100;
    }

    if (extra.indexOf("??????") >= 0 && score.line == "??????") {
      if (extra.indexOf("?????????") >= 0) {}

      if (extra.indexOf("%") >= 0) {
        const number = extra.replace(/[^0-9]/g, '');
        extraScore.tamgu = newScore.tamgu * number / 100;
      }
    }

    const totalScore = {
      korean: newScore.korean + extraScore.korean,
      math: newScore.math + extraScore.math,
      english: newScore.english + extraScore.english,
      tamgu: newScore.tamgu + extraScore.tamgu,
      history: newScore.history + extraScore.history
    }; // ?????? ????????? ????????? ?????? ????????? 

    if (reflectionSubject.indexOf("???,???+???,???,?????? ???2") >= 0 || reflectionSubject.indexOf("???+???,???,?????? ???2") >= 0) {
      var scores = [totalScore.korean, totalScore.math, totalScore.englsih];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[2] == totalScore.korean) {
        newScore.koeran = 0;
        extraScore.korean = 0;
      } else if (scores[2] == totalScore.english) {
        newScore.english = 0;
        extraScore.english = 0;
      } else {
        newScore.math = 0;
        extraScore.math = 0;
      }
    } else if (reflectionSubject.indexOf("???+???,???,?????? ???1") >= 0 && reflectionSubject.indexOf("???+???+???,?????? ??????1?????????") >= 0) {
      var scores = [totalScore.korean, totalScore.math, totalScore.englsih];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[0] == totalScore.korean) {
        newScore.math = 0;
        newScore.english = 0;
        extraScore.math = 0;
        extraScore.english = 0;
      } else if (scores[0] == totalScore.english) {
        newScore.korean = 0;
        newScore.math = 0;
        extraScore.korean = 0;
        extraScore.math = 0;
      } else {
        newScore.korean = 0;
        newScore.english = 0;
        extraScore.korean = 0;
        extraScore.english = 0;
      }
    } else if (reflectionSubject.indexOf("???,???,???,?????? ?????? 3??? ??????") >= 0 || reflectionSubject.indexOf("???,???,???,?????? ???3") >= 0 && reflectionSubject.indexOf("???,???,???,???,???2???????????? ???3")) {
      var scores = [totalScore.korean, totalScore.math, totalScore.english, totalScore.tamgu];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[3] == newScore.korean) {
        newScore.korean = 0;
        extraScore.korean = 0;
      } else if (scores[3] == newScore.english) {
        newScore.english = 0;
        extraScore.english = 0;
      } else if (scores[3] == newScore.math) {
        newScore.math = 0;
        extraScore.math = 0;
      } else {
        newScore.tamgu = 0;
        extraScore.tamgu = 0;
      }
    } else if (reflectionSubject.indexOf("???+???,???,?????? ???2") >= 0) {
      var scores = [totalScore.korean, totalScore.math, totalScore.tamgu];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[2] == newScore.korean) {
        newScore.korean = 0;
        extraScore.korean = 0;
      } else if (scores[2] == newScore.math) {
        newScore.math = 0;
        extraScore.math = 0;
      } else {
        newScore.tamgu = 0;
        extraScore.tamgu = 0;
      }
    } else if (reflectionSubject.indexOf("???,???+???,?????? ???1") >= 0 || reflectionSubject.indexOf("???+???+???,?????? ???1") >= 0) {
      if (totalScore.korean < totalScore.math) {
        newScore.korean = 0;
        extraScore.korean = 0;
      } else {
        newScore.math = 0;
        extraScore.math = 0;
      }
    } else if (reflectionSubject.indexOf("???,???,???,???,?????? ???4") >= 0) {
      var scores = [totalScore.korean, totalScore.math, totalScore.english, totalScore.tamgu, totalScore.history];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[4] == totalScore.korean) {
        newScore.korean = 0;
        extraScore.korean = 0;
      } else if (scores[4] == totalScore.english) {
        newScore.english = 0;
        extraScore.english = 0;
      } else if (scores[4] == totalScore.math) {
        newScore.math = 0;
        extraScore.math = 0;
      } else if (scores[4] == totalScore.tamgu) {
        newScore.tamgu = 0;
        extraScore.tamgu = 0;
      } else {
        newScore.history = 0;
        extraScore.history = 0;
      }
    } else if (reflectionSubject.indexOf("???,???,???,?????? ???2") >= 0) {
      var scores = [totalScore.korean, totalScore.math, totalScore.english, totalScore.tamgu];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[0] == totalScore.korean) {
        if (scores[1] == totalScore.math) {
          newScore.english = 0;
          newScore.tamgu = 0;
          extraScore.english = 0;
          extraScore.tamgu = 0;
        } else if (scores[1] == totalScore.english) {
          newScore.math = 0;
          newScore.tamgu = 0;
          extraScore.math = 0;
          extraScore.tamgu = 0;
        } else {
          newScore.math = 0;
          newScore.english = 0;
          extraScore.math = 0;
          extraScore.english = 0;
        }
      } else if (scores[0] == totalScore.math) {
        if (scores[1] == totalScore.korean) {
          newScore.english = 0;
          newScore.tamgu = 0;
          extraScore.english = 0;
          extraScore.tamgu = 0;
        } else if (scores[1] == totalScore.english) {
          newScore.korean = 0;
          newScore.tamgu = 0;
          extraScore.korean = 0;
          extraScore.tamgu = 0;
        } else {
          newScore.korean = 0;
          newScore.english = 0;
          extraScore.korean = 0;
          extraScore.english = 0;
        }
      } else if (scores[0] == totalScore.english) {
        if (scores[1] == totalScore.korean) {
          newScore.math = 0;
          newScore.tamgu = 0;
          extraScore.math = 0;
          extraScore.tamgu = 0;
        } else if (scores[1] == totalScore.math) {
          newScore.korean = 0;
          newScore.tamgu = 0;
          extraScore.korean = 0;
          extraScore.tamgu = 0;
        } else {
          newScore.korean = 0;
          newScore.math = 0;
          extraScore.korean = 0;
          extraScore.math = 0;
        }
      } else {
        if (scores[1] == totalScore.korean) {
          newScore.math = 0;
          newScore.english = 0;
          extraScore.math = 0;
          extraScore.english = 0;
        } else if (scores[1] == totalScore.math) {
          newScore.korean = 0;
          newScore.english = 0;
          extraScore.korean = 0;
          extraScore.english = 0;
        } else {
          newScore.math = 0;
          newScore.korean = 0;
          extraScore.math = 0;
          extraScore.korean = 0;
        }
      }
    } else if (reflectionSubject.indexOf("???,???+???,?????? ???1") >= 0) {
      if (totalScore.math > totalScore.tamgu) {
        newScore.tamgu = 0;
        extraScore.tamgu = 0;
      } else {
        newScore.math = 0;
        extraScore.math = 0;
      }
    } else if (reflectionSubject.indexOf("???,???+???,?????? ???1") >= 0) {
      if (totalScore.korean > totalScore.english) {
        newScore.english = 0;
        extraScore.english = 0;
      } else {
        newScore.korean = 0;
        extraScore.korean = 0;
      }
    } else if (reflectionSubject.indexOf("???,?????? ???1+???,???,?????? ???2") >= 0) {
      if (totalScore.history > totalScore.english) {
        newScore.english = 0;
        extraScore.english = 0;
      } else {
        newScore.history = 0;
        extraScore.history = 0;
      }

      var scores = [totalScore.korean, totalScore.math, totalScore.tamgu];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[2] == newScore.korean) {
        newScore.korean = 0;
        extraScore.korean = 0;
      } else if (scores[2] == newScore.math) {
        newScore.math = 0;
        extraScore.math = 0;
      } else {
        newScore.tamgu = 0;
        extraScore.tamgu = 0;
      }
    } else if (reflectionSubject.indexOf("???,???+???,?????? ???1") >= 0) {
      if (totalScore.korean > totalScore.tamgu) {
        newScore.tamgu = 0;
        extraScore.tamgu = 0;
      } else {
        newScore.korean = 0;
        extraScore.korean = 0;
      }
    } else if (reflectionSubject.indexOf("???+???,???,???,?????? ???1") >= 0) {
      var scores = [totalScore.math, totalScore.english, totalScore.tamgu, totalScore.history];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[0] == totalScore.math) {
        newScore.english = 0;
        newScore.tamgu = 0;
        newScore.history = 0;
        extraScore.english = 0;
        extraScore.tamgu = 0;
        extraScore.history = 0;
      } else if (scores[0] == totalScore.english) {
        newScore.korean = 0;
        newScore.tamgu = 0;
        newScore.history = 0;
        extraScore.korean = 0;
        extraScore.tamgu = 0;
        extraScore.history = 0;
      } else if (scores[0] == totalScore.tamgu) {
        newScore.math = 0;
        newScore.english = 0;
        newScore.history = 0;
        extraScore.math = 0;
        extraScore.english = 0;
        extraScore.history = 0;
      } else {
        newScore.korean = 0;
        newScore.math = 0;
        newScore.english = 0;
        extraScore.korean = 0;
        extraScore.math = 0;
        extraScore.english = 0;
      }
    } else if (reflectionSubject.indexOf("???+???,???,?????? ???1") >= 0) {
      var scores = [totalScore.korean, totalScore.english, totalScore.tamgu];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[0] == totalScore.korean) {
        newScore.english = 0;
        newScore.tamgu = 0;
        extraScore.english = 0;
        extraScore.tamgu = 0;
      } else if (scores[0] == totalScore.english) {
        newScore.korean = 0;
        newScore.tamgu = 0;
        extraScore.korean = 0;
        extraScore.tamgu = 0;
      } else if (scores[0] == totalScore.tamgu) {
        newScore.korean = 0;
        newScore.english = 0;
        extraScore.korean = 0;
        extraScore.english = 0;
      }
    } else if (reflectionSubject.indexOf("???+???,???,???,?????? ???1") >= 0) {
      console.log("????????? ????????????");
      var scores = [totalScore.korean, totalScore.english, totalScore.tamgu, totalScore.history];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[0] == totalScore.korean) {
        newScore.english = 0;
        newScore.tamgu = 0;
        newScore.history = 0;
        extraScore.english = 0;
        extraScore.tamgu = 0;
        extraScore.history = 0;
      } else if (scores[0] == totalScore.english) {
        newScore.korean = 0;
        newScore.tamgu = 0;
        newScore.history = 0;
        extraScore.korean = 0;
        extraScore.tamgu = 0;
        extraScore.history = 0;
      } else if (scores[0] == totalScore.tamgu) {
        newScore.korean = 0;
        newScore.english = 0;
        newScore.history = 0;
        extraScore.korean = 0;
        extraScore.english = 0;
        extraScore.history = 0;
      } else {
        newScore.korean = 0;
        newScore.english = 0;
        newScore.tamgu = 0;
        extraScore.korean = 0;
        extraScore.english = 0;
        extraScore.tamgu = 0;
      }

      console.log("?????????");
    } else if (reflectionSubject.indexOf("???+???,???,?????? ?????? 2??? ??????") >= 0) {
      var scores = [totalScore.korean, totalScore.math, totalScore.english];
      scores.sort(function (a, b) {
        return b - a;
      });

      if (scores[2] == totalScore.korean) {
        newScore.korean = 0;
        extraScore.korean = 0;
      } else if (scores[2] == totalScore.english) {
        newScore.english = 0;
        extraScore.english = 0;
      } else {
        newScore.math = 0;
        extraScore.math = 0;
      }
    } else if (reflectionSubject.indexOf("???,???,???,???,???2???????????? ???3") >= 0) {} else {
      console.log("simpleType");
    }

    const total = newScore.korean + newScore.math + newScore.english + newScore.tamgu + newScore.history + extraScore.korean + extraScore.math + extraScore.english + extraScore.tamgu + extraScore.history;
    console.log(newScore.korean);
    console.log(newScore.math);
    console.log(newScore.english);
    console.log(newScore.tamgu);
    console.log(newScore.history);
    console.log(score.userId);
    console.log(majorData.id);

    if (create == true) {
      const recommendations = await _services.majorDataService.findRecommendations(total);
      console.log(recommendations);
      const modelObj = {
        score,
        majorDataId: majorData.id,
        userId: score.userId,
        perfectScore,
        score: newScore,
        extraScore: extraScore,
        totalScore: total,
        recommendations
      };
      return modelObj;
    } else {
      return total;
    }
  }

}

exports.default = reportController;