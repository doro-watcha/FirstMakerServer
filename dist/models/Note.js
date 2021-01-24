"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Note extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 문제 상태
      status: {
        type: _sequelize.default.STRING,
        defaultValue: "준비됨"
      },
      submit: {
        type: _sequelize.default.STRING,
        defaultValue: 0
      },
      spendingTime: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      isGreenStar: {
        type: _sequelize.default.BOOLEAN,
        defaultValue: false
      },
      updatedAt: {
        type: _sequelize.default.DATE,
        allowNull: false,
        defaultValue: _sequelize.default.literal('CURRENT_TIMESTAMP'),
        onUpdate: _sequelize.default.literal('CURRENT_TIMESTAMP')
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Homework, {
      foreignKey: 'homeworkId',
      as: 'homework'
    }), this.belongsTo(models.Exam, {
      foreignKey: 'examId',
      as: 'exam'
    }), this.belongsTo(models.WorkBook, {
      foreignKey: 'workBookId',
      as: 'workBook'
    }), this.belongsTo(models.WorkPaper, {
      foreignKey: 'workPaperId',
      as: 'workPaper'
    }), this.belongsTo(models.Problem, {
      foreignKey: 'problemId',
      as: 'problem'
    }), this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.homeworkId;
    delete object.examId;
    delete object.workBookId;
    delete object.workPaperId;
    delete object.problemId;
    delete object.studentId;
    delete object.collectionId;
    delete object.workBookRecordId;
    return object;
  }

}

exports.default = Note;