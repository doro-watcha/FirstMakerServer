"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BlackList extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({}, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    }), this.belongsTo(models.Problem, {
      foreignKey: 'problemId',
      as: 'problem'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.teacherId;
    delete object.problemId;
    return object;
  }

}

exports.default = BlackList;