"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

class Score extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      accountId: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
      },
      type: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      subject: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      score: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
      },
      grade: {
        type: _sequelize.default.INTEGER,
        defaultVale: -1
      },
      percentile: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
      },
      createdAt: {
        type: _sequelize.default.DATE,
        allowNull: false,
        defaultValue: _sequelize.default.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: _sequelize.default.DATE,
        allowNull: false,
        defaultValue: _sequelize.default.literal('CURRENT_TIMESTAMP'),
        onUpdate: _sequelize.default.literal('CURRENT_TIMESTAMP')
      }
    }, {
      sequelize
    });
  }

}

exports.default = Score;