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
      email: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      telephone: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      password: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      highSchool: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      line: {
        type: _sequelize.default.STRING,
        allwoNull: true
      },
      gender: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      graduateYear: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
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

  static associate(models) {
    this.hasMany(models.Report, {
      foreignKey: 'userId',
      as: 'user'
    });
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
    telephone: {
      type: 'string',
      example: "010-7270-5880"
    },
    password: {
      type: 'string',
      example: 'password'
    },
    highSchool: {
      type: 'string',
      example: '볼사고등학교'
    },
    line: {
      type: 'string',
      example: '문과'
    },
    gender: {
      type: 'string',
      example: '남'
    },
    graduateYear: {
      type: 'integer',
      example: '2013'
    },
    predictTimes: {
      type: 'integer',
      example: 3
    }
  }
};
exports.schema = schema;