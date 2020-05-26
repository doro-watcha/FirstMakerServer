"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

class ScoreService {
  static async getScore(req, res) {
    const accountId = req.query.accountId;
    const result = await _services.scoreService.findByAccountId(accountId);
    const response = {
      data: {
        result
      },
      success: true
    };
    res.send(response);
  }

  static async setScore(req, res) {}

}

exports.default = ScoreService;