"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WorkBook extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      thumbnailUrl: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      publisher: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.WorkBookRecord, {
      foreignKey: 'workBookId',
      as: 'workBookRecords'
    }), this.hasMany(models.Problem, {
      foreignKey: 'workBookId',
      as: 'problems'
    }), this.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.updatedAt;
    delete object.createdAt;
    delete object.subjectId;
    return object;
  }

}

exports.default = WorkBook;