"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Score extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      line: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      korean: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      math: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      english: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      tamgu1: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      tamgu2: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      history: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      foreign: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      naesin1: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      naesin2: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      naesin3: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      naesin_type: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      userId: {
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
      foreginKey: 'userId',
      as: 'user'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.userId;
    return object;
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
    user: {
      $ref: '#/components/schemas/User'
    },
    line: {
      type: 'string',
      example: '??????'
    },
    korean: {
      type: 'json',
      example: {
        "score": 134,
        "grade": 1,
        "percentile": 98
      }
    },
    math: {
      type: 'json',
      example: {
        "score": 134,
        "grade": 1,
        "percentile": 98,
        "type": "???"
      }
    },
    english: {
      type: 'json',
      example: {
        "grade": 1
      }
    },
    tamgu1: {
      type: 'json',
      example: {
        "score": 86,
        "grade": 1,
        "percentile": 98,
        "name": "???????????????"
      }
    },
    tamgu2: {
      type: 'json',
      example: {
        "score": 86,
        "grade": 1,
        "percentile": 98,
        "name": "????????????1"
      }
    },
    foreign: {
      type: 'json',
      example: {
        "score": 86,
        "grade": 1,
        "percentile": 98
      }
    },
    history: {
      type: 'json',
      example: {
        "grade": 1
      }
    },
    naesin: {
      type: 'float',
      example: 3.8
    },
    naesin_type: {
      type: 'sting',
      example: "????????????"
    }
  },
  required: ['id', 'user']
};
exports.schema = schema;