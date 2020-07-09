"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReflectionRatio extends _sequelize.default.Model {
  static init(sequelize) {
    return super.init({
      // 반영지표 ex) 표+백 , 반영과목 ex) 국수영탐, 반영 과목 갯수, 응시 갯수, 제2외국어를 포함하는지
      metadata: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      // 과목별 반영 비율
      ratio: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      // 영어, 한국사, 수능 가감점, 특이사항
      description: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      // 영어 한국사 최저등급
      minGrade: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      // 가산점 비율 
      extraRatio: {
        type: _sequelize.default.JSON,
        allowNull: true
      },
      // 국수영탐 표준점수 만점
      perfectScore: {
        type: _sequelize.default.JSON,
        defaultValue: true
      },
      //총 만점 (1000점임 보통)
      totalScore: {
        type: _sequelize.default.INTEGER,
        defaultValue: 1000
      },
      // 국사, 영어 등급 표준점수 변환
      gradeToScore: {
        type: _sequelize.default.JSON,
        allowNull: true
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.University, {
      foreignKey: 'univId',
      as: 'university'
    });
  }

} // swagger schema


exports.default = ReflectionRatio;
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    university: {
      $ref: '#/components/schemas/University'
    },
    metadata: {
      type: 'json',
      example: {
        'applicationIndicator': '표+백',
        'reflectionSubject': '국수영탐',
        'reflectionNumber': 1,
        'applyingNumber': 1,
        'isForeignIncluded': false
      }
    },
    ratio: {
      type: 'json',
      example: {
        'korean': 30,
        'english': 30,
        'math': 30,
        'type': '가',
        'tamgu': 30,
        'job': 30,
        'foreign': 30,
        'history': 30
      }
    },
    description: {
      type: 'json',
      example: {
        'english': '영어20% 반영',
        'history': '1-4등급 10점, 5-6등급 9점 , 7-9등급 8점 가산',
        'extra': '수능 가감점',
        'somethingSpecial': '수능 특이사항'
      }
    },
    minGrade: {
      type: 'json',
      example: {
        'english': '영어 최저학력등급',
        'history': ' 한국사 최저학력등급'
      }
    },
    extraRatio: {
      type: 'json',
      example: {
        'korean': 0,
        'math': 10,
        'english': 0,
        'tamgu': {
          '물리2': 0,
          '화학2': 0,
          '지구과학2': 35,
          '생물2': 0,
          '물리1': 0
        }
      }
    },
    perfectScore: {
      type: 'json',
      example: {
        'korean': 200,
        'math': 200,
        'english': 200,
        'tamgu': 200
      }
    },
    totalScore: {
      type: 'integer',
      example: 1000
    },
    gradeToScore: {
      type: 'json',
      example: {
        'english': [200, 190, 180, 170, 160, 150, 140, 130, 120, 110],
        'history': [10, 10, 10, 10, 9, 9, 9, 9, 8, 8]
      }
    }
  },
  required: ['id', 'university']
};
exports.schema = schema;