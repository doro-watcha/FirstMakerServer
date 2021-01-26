"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WorkBookRecord extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student'
    }), this.belongsTo(models.WorkBook, {
      foreignKey: 'workBookId',
      as: 'workBook'
    }), this.belongsTo(models.BigChapter, {
      foreignKey: 'bigChapterId',
      as: 'bigChapter'
    });
    this.hasMany(models.Note, {
      foreignKey: 'workBookRecordId',
      as: 'notes'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.studentId;
    delete object.workBookId;
    return object;
  }

}

exports.default = WorkBookRecord;