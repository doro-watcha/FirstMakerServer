"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReflectionRatio extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 반영지표 ex) 표+백
      applicationIndicator: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      // 반영과목 ex) 국수영탐
      reflectionSubject: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      koreanRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      mathRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      englishRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      societyRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      scienceRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      jobRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      foreignRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      historyRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      // 반영 과목 갯수 
      reflectionNumber: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      // 응시 갯수
      applyingNumber: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      englishDescription: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      englishMinGrade: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      historyDescription: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      historyMinGrade: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      extraPoint: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      somethingSpecial: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      koreanExtraRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      mathExtraRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      englishExtraRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      tamguExtraRatio: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      koreanPerfectScore: {
        type: _sequelize.default.FLOAT,
        defaultValue: 200
      },
      mathPerfectScore: {
        type: _sequelize.default.FLOAT,
        defaultValue: 200
      },
      englishPerfectScore: {
        type: _sequelize.default.FLOAT,
        defaultValue: 200
      },
      tamguPerfectScore: {
        type: _sequelize.default.FLOAT,
        defaultValue: 200
      },
      totalScore: {
        type: _sequelize.default.INTEGER,
        defaultValue: 1000
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.University, {
      foreignKey: 'univId',
      as: 'university'
    });
  }

}

exports.default = ReflectionRatio;