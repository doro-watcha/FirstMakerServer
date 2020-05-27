"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

let instance = null;

class ScoreService {
  constructor() {
    if (!instance) {
      console.log('Score Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async findByAccountId(accountId) {
    return await _models.Score.findAll({
      where: {
        accountId
      },
      attributes: ["subject", "type", "score", "grade", "percentile"]
    });
  }

  async setScore(score) {
    return await _models.Score.bulkCreate();
  }

}

var _default = new ScoreService();

exports.default = _default;