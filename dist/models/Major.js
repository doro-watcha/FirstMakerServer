"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Major extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 연도
      year: {
        type: _sequelize.default.INTEGER,
        defaultValue: 2020
      },
      // 계열
      line: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      // 군별
      group: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      // 모집 전형
      admissionType: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      // 모집 인원
      recruitmentNumber: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      // 수시이월 인원
      additionalMember: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      // 최종 모집인원
      finalNumber: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      // 경쟁률
      competitionNumber: {
        type: _sequelize.default.FLOAT,
        allowNull: true
      },
      // 내신 반영 유무
      isNaesinIncluded: {
        type: _sequelize.default.BOOLEAN,
        defaultValue: false
      },
      name: {
        type: _sequelize.default.STRING,
        allwoNull: true
      },
      majorCode: {
        type: _sequelize.default.INTEGER,
        defaultValue: -1
      },
      strong_val: {
        type: _sequelize.default.FLOAT,
        allowNull: true
      },
      safe_val: {
        type: _sequelize.default.FLOAT,
        allowNull: true
      },
      dangerous_val: {
        type: _sequelize.default.FLOAT,
        allowNull: true
      },
      sniping_val: {
        type: _sequelize.default.FLOAT,
        allowNull: true
      },
      somethingSpecial: {
        type: _sequelize.default.STRING,
        allowNull: true
      },
      etc: {
        type: _sequelize.default.STRING,
        allowNull: true
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
    this.hasMany(models.Report, {
      foreignKey: 'majorId',
      as: 'report'
    }), this.belongsTo(models.University, {
      foreignKey: 'univId',
      as: 'univ'
    });
  }

} // swagger schema


exports.default = Major;
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    year: {
      type: 'integer',
      example: 2020
    },
    line: {
      type: 'integer',
      example: 0
    },
    group: {
      type: 'integer',
      example: '0'
    },
    admissionType: {
      type: 'string',
      example: '기회균등전형'
    },
    recruitmentNumber: {
      type: 'integer',
      example: '35'
    },
    additionalMember: {
      type: 'integer',
      example: '3'
    },
    finalNumber: {
      type: 'integer',
      example: '38'
    },
    competitionNumber: {
      type: 'float',
      example: 3.5
    },
    isNaesinIncluded: {
      type: 'boolean',
      example: false
    },
    name: {
      type: 'string',
      example: '지영학과'
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
    },
    somethingSpecial: {
      type: 'string',
      example: '개발하기 너무 싫다'
    },
    etc: {
      type: 'string',
      example: '리얼로다가'
    },
    univ: {
      $ref: '#/components/schemas/University'
    }
  },
  required: ['id', 'name', 'univ']
};
exports.schema = schema;