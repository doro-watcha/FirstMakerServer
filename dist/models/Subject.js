"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Subject extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 단원 이름 
      name: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.BigChapter, {
      foreignKey: 'subjectId',
      as: 'bigChapter'
    });
    this.hasMany(models.Problem, {
      foreignKey: 'subjectId',
      as: 'problem'
    });
    this.hasMany(models.WorkBook, {
      foreignKey: 'subjectId',
      as: 'workBooks'
    });
    this.hasMany(models.WorkBookRecord, {
      foreignKey: 'subjectId',
      as: 'subject'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.workBookId;
    return object;
  }

}

exports.default = Subject;