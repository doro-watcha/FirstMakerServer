"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WorkPaper extends _sequelize.default.Model {
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
      spendingTime: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      accurateRate: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'author'
    }), this.hasMany(models.Note, {
      foreignKey: 'workPaperId',
      as: 'note'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.updatedAt;
    return object;
  }

}

exports.default = WorkPaper;