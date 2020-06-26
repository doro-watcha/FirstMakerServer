"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      userId: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      password: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      email: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      highSchool: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      line: {
        type: _sequelize.default.INTEGER,
        allwoNull: true
      },
      graduateYear: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
      },
      isVerified: {
        type: _sequelize.default.BOOLEAN,
        defaultValue: false
      },
      predictTimes: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
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

  static hashPassword(unencryptedPwd) {
    return _bcrypt.default.hashSync(unencryptedPwd, 8);
  }

  isValidPassword(unencryptedPwd) {
    return _bcrypt.default.compareSync(unencryptedPwd, this.password);
  }

} // swagger schema


exports.default = User;
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    name: {
      type: 'string',
      example: '안지영'
    },
    email: {
      type: 'string',
      example: 'Bol4@gmail.com'
    },
    highSchool: {
      type: 'string',
      example: '볼사고등학교'
    },
    line: {
      type: 'integer',
      example: '0'
    },
    graduateYear: {
      type: 'integer',
      example: '2013'
    },
    isVerfieid: {
      type: 'boolean',
      example: false
    },
    predictTimes: {
      type: 'integer',
      example: 3
    }
  }
};
exports.schema = schema;