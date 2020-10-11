"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Exam extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 시험 마감날짜 
      dueDate: {
        type: _sequelize.default.DATE,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

}

exports.default = Exam;