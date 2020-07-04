"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentRecord extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      amount: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      predictTimes: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
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

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }

} // swagger schema


exports.default = PaymentRecord;
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    amount: {
      type: 'integer',
      example: 97000
    },
    predictTimes: {
      type: 'integer',
      example: 5
    },
    user: {
      $ref: '#/components/schemas/User'
    }
  },
  required: ['id', 'amount', 'predictTimes', 'user']
};
exports.schema = schema;