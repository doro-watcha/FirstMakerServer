"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MajorData extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      year: {
        type: _sequelize.default.INTEGER,
        defaultValue: 0
      },
      // metadata = initialMember , additionalMember , competitionRate, reflectionSubject, tamguNumber , applicationIndicator, extraPoint,
      metadata: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      prediction: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      ratio: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      gradeToScore: {
        type: _sequelize.default.JSON,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Major, {
      foreignKey: 'majorId',
      as: 'major'
    });
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues); // delete some (key, value)

    delete object.createdAt;
    delete object.updatedAt;
    delete object.majorId;
    return object;
  }

} // swagger schema


exports.default = MajorData;
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    year: {
      type: 'integer',
      exammple: 2020
    },
    metadata: {
      type: 'json',
      example: {
        initialMember: 3,
        additionalMember: 4,
        competitionRate: 4.3,
        reflectionSubject: '국수영사',
        tamguNumber: 3,
        applicationIndicator: '백분위',
        extraPoint: '수가10퍼센트 더준다고~'
      }
    },
    prediction: {
      type: 'json',
      example: {
        strong: 600.3,
        safe: 603.4,
        dangerous: 234.3,
        sniping: 234.3
      }
    },
    ratio: {
      type: 'json',
      example: {
        korean: 40,
        englsih: 30,
        math: 40,
        tamgu: 20,
        foreign: 30,
        history: 40
      }
    },
    gradeToScore: {
      type: 'json',
      example: {
        englsih: {
          way: '수능반영비율',
          score: [1, 2, 3, 4, 5, 6, 6, 6]
        },
        history: {
          way: '수능반영비율',
          score: [1, 2, 3, 4, 5, 5, 5, 5]
        }
      }
    }
  }
};
exports.schema = schema;