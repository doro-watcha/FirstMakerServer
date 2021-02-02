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
      // 문제지 이름 
      title: {
        type: _sequelize.default.STRING,
        alloNull: true
      },
      status: {
        type: _sequelize.default.STRING,
        defaultValue: "준비됨"
      },
      numChapters: {
        type: _sequelize.default.INTEGER,
        defaultValue: 1
      },
      mainChapter: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      accurateRate: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      spendingTime: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      timeLimit: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'author'
    }), this.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    }), this.hasMany(models.Note, {
      foreignKey: 'examId',
      as: 'note'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)
    //delete object.createdAt
    //delete object.updatedAt

    delete object.teacherId;
    delete object.studentId;
    return object;
  }

}

exports.default = Exam;