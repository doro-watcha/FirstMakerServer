"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClassBelongs extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({}, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student'
    }), this.belongsTo(models.Class, {
      foreignKey: 'classId',
      as: 'class'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.studentId;
    delete object.classId;
    return object;
  }

}

exports.default = ClassBelongs;