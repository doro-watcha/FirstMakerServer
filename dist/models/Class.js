"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Class extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.Student, {
      foreignKey: 'classId',
      as: 'student'
    }), this.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    }), this.hasMany(models.ClassBelongs, {
      foreignKey: 'classId',
      as: 'classBelongs'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.teacherId;
    return object;
  }

}

exports.default = Class;