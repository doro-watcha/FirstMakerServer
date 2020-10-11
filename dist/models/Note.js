"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Note extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 문제 Image Url
      status: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Homework, {
      foreignKey: 'homeworkId',
      as: 'homework'
    }), this.belongsTo(models.Exam, {
      foreignKey: 'examId',
      as: 'exam'
    }), this.belongsTo(models.Problem, {
      foreignKey: 'problemId',
      as: 'problem'
    });
  }

}

exports.default = Note;