"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Student extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 중단원 이름 
      school: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      grade: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      mathGrade: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }

}

exports.default = Student;