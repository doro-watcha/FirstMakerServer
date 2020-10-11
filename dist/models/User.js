"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 이름 
      name: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      email: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      password: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
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
      type: {
        type: _sequelize.default.STRING,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static hashPassword(unencryptedPwd) {
    return _bcrypt.default.hashSync(unencryptedPwd, 8);
  }

  isValidPassword(unencryptedPwd) {
    return _bcrypt.default.compareSync(unencryptedPwd, this.password);
  }

  static associate(models) {}

  static associate(models) {
    this.hasMany(models.Homework, {
      foreignKey: 'userId',
      as: 'homework'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.password;
    return object;
  }

}

exports.default = User;