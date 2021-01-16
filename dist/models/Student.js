"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Student extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      school: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      grade: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      mathGrade: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      name: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    }), this.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    }), this.belongsTo(models.Class, {
      foreignKey: "classId",
      as: 'class'
    }), this.hasOne(models.ClassBelongs, {
      foreignKey: 'studentId',
      as: 'classBelongs'
    }), this.hasMany(models.WorkPaper, {
      foreignKey: 'studentId',
      as: 'workPaper'
    }), this.hasMany(models.Homework, {
      foreignKey: 'studentId',
      as: 'Homework'
    }), this.hasMany(models.Exam, {
      foreignKey: 'studentId',
      as: 'Exam'
    }), this.hasMany(models.Note, {
      foreignKey: 'studentId',
      as: 'Note'
    });
    this.belongsToMany(models.WorkBook, {
      through: 'StudentWorkBook',
      as: 'workbooks'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.classId;
    delete object.teacherId;
    delete object.userId;
    return object;
  }

}

exports.default = Student;