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

  async create(modelObj) {
    return await _models.Score.create(modelObj);
  }

  async findByUserId(userId) {
    return await _models.Score.findOne({
      where: {
        userId: userId
      }
    });
  }

  async updateById(userId, score) {
    await _models.Score.update(score, {
      where: {
        userId
      }
    });
    const updatedScore = await _models.Score.findOne({
      where: {
        userId
      }
    });
    if (updatedScore === null) throw Error('SCORE_NOT_FOUND');
    return updatedScore;
  }

  async deleteById(userId) {
    const score = await _models.Score.findOne({
      where: {
        userId
      }
    });

    if (score == null) {
      throw Error('SCORE_NOT_FOUND');
    } else {
      await score.destroy();
    }
  }

}

var _default = new ScoreService();

exports.default = _default;