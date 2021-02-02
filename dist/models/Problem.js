"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Problem extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 문제 Image Url
      problemUrl: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      solutionUrl: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      // 문제의 정답 
      answer: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      level: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      source: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      isMultipleQuestion: {
        type: _sequelize.default.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        type: _sequelize.default.DATE,
        allowNull: false,
        defaultValue: _sequelize.default.literal('CURRENT_TIMESTAMP')
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
    this.belongsTo(models.BigChapter, {
      foreignKey: 'bigChapterId',
      as: 'bigChapter'
    }), this.belongsTo(models.MiddleChapter, {
      foreignKey: 'middleChapterId',
      as: 'middleChapter'
    }), this.belongsTo(models.SmallChapter, {
      foreignKey: 'smallChapterId',
      as: 'smallChapter'
    });
    this.belongsTo(models.Subject, {
      foreingKey: 'subjectId',
      as: 'subject'
    });
    this.hasOne(models.Note, {
      foreignKey: 'problemId',
      as: 'note'
    });
    this.belongsTo(models.WorkBook, {
      foreignKey: 'workBookId',
      as: 'workBook'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.subjectId;
    delete object.problemId;
    delete object.bigChapterId;
    delete object.middleChapterId;
    delete object.smallChapterId;
    delete object.workBookId;
    return object;
  }

}

exports.default = Problem;