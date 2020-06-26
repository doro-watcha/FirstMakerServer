"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class University extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      line: {
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
        allowNull: true,
        defaultValue: _sequelize.default.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: _sequelize.default.DATE,
        allowNull: true,
        defaultValue: _sequelize.default.literal('CURRENT_TIMESTAMP'),
        onUpdate: _sequelize.default.literal('CURRENT_TIMESTAMP')
      }
    }, {
      sequelize
    });
  }

} // swagger schema


exports.default = University;
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    line: {
      type: 'integer',
      example: 0
    },
    group: {
      type: 'string',
      example: '0'
    },
    name: {
      type: 'string',
      example: '고려대'
    },
    major: {
      type: 'string',
      example: '간호대학'
    },
    majorCode: {
      type: 'integer',
      example: 35
    },
    strong_val: {
      type: 'float',
      example: 690.5
    },
    safe_val: {
      type: 'float',
      example: 685.5
    },
    dangerous_val: {
      type: 'float',
      example: 680.6
    },
    sniping_val: {
      type: 'float',
      example: 665.5
    }
  },
  required: ['major', 'name']
};
exports.schema = schema;