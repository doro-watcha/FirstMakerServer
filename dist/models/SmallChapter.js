"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SmallChapter extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 소단원 이름 
      name: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.MiddleChapter, {
      foreignKey: 'middleChapterId',
      as: 'middleChapter'
    }), this.hasMany(models.Problem, {
      foreignKey: 'smallChapterId',
      as: 'problem'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.middleChapterId;
    return object;
  }

}

exports.default = SmallChapter;