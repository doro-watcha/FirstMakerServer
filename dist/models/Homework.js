"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Homework extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 숙제 이름 
      name: {
        type: _sequelize.default.STRING,
        alloNull: true
      },
      // 숙제 마감날짜 
      dueDate: {
        type: _sequelize.default.DATE,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    }), this.hasMany(models.Note, {
      foreignKey: 'homeworkId',
      as: 'note'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    return object;
  }

}

exports.default = Homework;