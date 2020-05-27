"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

class Score extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      accountId: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
      },
      type: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      subject: {
        type: _sequelize.default.STRING,
        allowNull: false
      },
      score: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
      },
      grade: {
        type: _sequelize.default.INTEGER,
        defaultVale: -1
      },
      percentile: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
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

} // swagger schema


exports.default = Score;
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    accountId: {
      type: 'integer',
      example: 3
    },
    subject: {
      type: 'string',
      example: 'koean'
    },
    type: {
      type: 'string',
      example: '나'
    },
    score: {
      type: 'integer',
      example: 133
    },
    grade: {
      type: 'integer',
      example: '1'
    },
    percentile: {
      type: 'integer',
      example: '94'
    }
  },
  required: ['id', 'subject', 'type', 'score', 'grade', 'percentile']
};
exports.schema = schema;