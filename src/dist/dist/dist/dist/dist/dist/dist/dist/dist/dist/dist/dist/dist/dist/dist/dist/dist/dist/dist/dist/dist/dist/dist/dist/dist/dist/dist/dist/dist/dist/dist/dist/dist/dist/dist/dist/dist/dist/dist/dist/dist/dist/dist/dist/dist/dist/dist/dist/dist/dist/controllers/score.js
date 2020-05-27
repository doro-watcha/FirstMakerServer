"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

class ScoreService {
  static async getScore(req, res) {
    const accountId = 0;
    const result = await _services.scoreService.findByAccountId(accountId);
    const response = {
      data: {
        result
      },
      success: true
    };
    res.send(response);
  }

  static async setScore(req, res) {
    const score = req.body.score;
    const result = await _services.scoreService.setScore(score);
    const response = {
      data: {
        result
      },
      success: true
    };
    res.send(response);
  }

  static async translateScore(req, res) {
    console.log("fuck");
    var korean = req.body.korean;
    var math = req.body.math;
    var english = req.body.english;
    var history = req.body.history;
    var tamgu1 = req.body.tamgu1;
    var tamgu2 = req.body.tamgu2;
    var new_korean = parseInt(korean.score * 357.1 / 200);
    var new_math = parseInt(math.score * 357.1 / 200);
    var new_tamgu = parseInt((tamgu1.score + tamgu2.score) * 285.7 / 200);
    var new_english = english.grade * 2 - 3;
    var new_history = 0;
    if (history.grade < 4) new_history = 10;else if (history.grade > 3 && history.grade < 8) {
      new_history = 10 - 0.2 * (history.grade - 3);
    } else new_history = 9;
    var total = new_korean + new_math + new_tamgu - new_english + new_history;
    var object = {
      data: total,
      success: true
    };
    res.send(object);
  }

}

exports.default = ScoreService;