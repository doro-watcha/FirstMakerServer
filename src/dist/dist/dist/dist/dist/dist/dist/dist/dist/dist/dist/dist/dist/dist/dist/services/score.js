"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

let instance = null;

class ScoreService {
  constructor() {
    if (!instance) {
      console.log('Score Service 생성' + this);
      instance = this;
    }

    return instance;
  }

  async findById(id) {
    return await _models.default.findOne({
      where: {
        "accountId": id
      },
      attributes: ["subject", "score", "grade", "percentile", "type"]
    });
  }

}

var _default = new ScoreService();

exports.default = _default;