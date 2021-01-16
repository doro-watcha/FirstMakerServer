"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Collection extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 문제 title 
      title: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      type: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      timeLimit: {
        type: _sequelize.default.INTEGER,
        allowNull: true
      },
      status: {
        type: _sequelize.default.STRING,
        defaultValue: "READY"
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    }), this.hasMany(models.Note, {
      foreignKey: 'collectionId',
      as: 'note'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    return object;
  }

}

exports.default = Collection;