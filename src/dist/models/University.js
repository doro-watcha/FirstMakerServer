"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class University extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      type: {
        type: _sequelize.default.INTEGER,
        allowNull: false
      },
      group: {
        type: _sequelize.default.INTEGER,
        allowNull: false
      },
      name: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      major: {
        type: _sequelize.default.STRING,
        allwoNull: false
      },
      majorCode: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
      },
      strong_val: {
        type: _sequelize.default.FLOAT,
        allowNull: false
      },
      safe_val: {
        type: _sequelize.default.FLOAT,
        allowNull: false
      },
      dangerous_val: {
        type: _sequelize.default.FLOAT,
        allowNull: false
      },
      sniping_val: {
        type: _sequelize.default.FLOAT,
        allowNull: false
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

}

exports.default = University;