"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BigChapter extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 문제 Image Url
      name: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject'
    }), this.hasMany(models.MiddleChapter, {
      foreignKey: 'bigChapterId',
      as: 'middleChapter'
    }), this.hasMany(models.Problem, {
      foreignKey: 'bigChapterId',
      as: 'problem'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    return object;
  }

}

exports.default = BigChapter;