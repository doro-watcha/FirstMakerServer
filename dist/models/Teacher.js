"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Teacher extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      subject: {
        type: _sequelize.default.STRING,
        defaultValue: "math"
      },
      name: {
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
    }), this.hasMany(models.Student, {
      foreignKey: 'teacherId',
      as: 'student'
    }), this.hasMany(models.Class, {
      foreignKey: 'teacherId',
      as: 'class'
    }), this.hasMany(models.Homework, {
      foreignKey: 'teacherId',
      as: 'homework'
    }), this.hasMany(models.Exam, {
      foreignKey: 'teacherId',
      as: 'exam'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.userId;
    return object;
  }

}

exports.default = Teacher;