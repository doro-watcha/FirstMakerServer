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
      type: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      korean_score: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      korean_grade: {
        type: _sequelize.default.INTEGER,
        defaultVale: 0
      },
      korean_percentile: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      english_grade: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      math_score: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      math_grade: {
        type: _sequelize.default.INTEGER,
        defaultVale: 0
      },
      math_percentile: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      tamgu1_score: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      tamgu1_grade: {
        type: _sequelize.default.INTEGER,
        defaultVale: 0
      },
      tamgu1_percentile: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      tamgu2_score: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      tamgu2_grade: {
        type: _sequelize.default.INTEGER,
        defaultVale: 0
      },
      tamgu2_percentile: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      history_grade: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      total_score: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
      },
      total_percentile: {
        type: _sequelize.default.FLOAT,
        defaultValue: 0.0
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

} // swagger schema


exports.default = Score;
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    type: {
      type: 'string',
      example: '가'
    },
    korean_score: {
      type: 'integer',
      example: 130
    },
    korean_grade: {
      type: 'integer',
      example: 1
    },
    korean_percentile: {
      type: 'integer',
      example: 97
    },
    math_score: {
      type: 'integer',
      example: 130
    },
    math_grade: {
      type: 'integer',
      example: 1
    },
    math_percentile: {
      type: 'integer',
      example: 97
    },
    english_grade: {
      type: 'integer',
      example: 3
    },
    history_grade: {
      type: 'integer',
      example: 1
    },
    tamgu1_score: {
      type: 'integer',
      example: 130
    },
    tamgu1_grade: {
      type: 'integer',
      example: 1
    },
    tamgu1_percentile: {
      type: 'integer',
      example: 97
    },
    tamgu2_score: {
      type: 'integer',
      example: 130
    },
    tamgu2_grade: {
      type: 'integer',
      example: 1
    },
    tamgu2_percentile: {
      type: 'integer',
      example: 97
    },
    total_score: {
      type: 'integer',
      example: 880
    },
    total_percentile: {
      type: 'integer',
      example: 99
    },
    user: {
      $ref: '#/components/schemas/User'
    }
  },
  required: ['id', 'user']
};
exports.schema = schema;