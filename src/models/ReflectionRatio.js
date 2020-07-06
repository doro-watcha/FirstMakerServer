import Sequelize from 'sequelize'

export default class ReflectionRatio extends Sequelize.Model {

  static init (sequelize) {

    return super.init({

      // 반영지표 ex) 표+백 , 반영과목 ex) 국수영탐, 반영 과목 갯수, 응시 갯수
      metadata : {
        type : Sequelize.JSON,
        allowNull : true
      },
      // 과목별 반영 비율
      ratio : {
        type : Sequelize.JSON,
        allowNull : true 
      },
      // 영어, 한국사, 수능 가감점, 특이사항
      description : {
        type : Sequelize.JSON,
        allowNull : true
      },
      // 영어 한국사 최저등급
      minGrade : {
        type : Sequelize.JSON,
        allowNull : true
      },
      // 국수영탐 가산점 비율 
      extraRatio : {
        type : Sequelize.JSON,
        allowNull : true
      },
      // 국수영탐 표준점수 만점
      perfectScore : {
        type : Sequelize.JSON,
        defaultValue : true
      },

      //총 만점 (1000점임 보통)
      totalScore : {
        type : Sequelize.INTEGER,
        defaultValue : 1000
      },

      // 국사, 영어 등급 표준점수 변환
      gradeToScore : {
        type : Sequelize.JSON,
        allowNull : true
      },

      // 표+백 일경우에 백분위를 표준점수 변환
      percentileToScore : {
        type : Sequelize.JSON,
        allowNull : true
      }
    }, 
    {
      sequelize
    },
    )
  }

  static associate(models) {
    this.belongsTo(models.University, {
      foreignKey: 'univId',
      as: 'university',
    })
  }

}

// swagger schema
export const schema = {
	type: 'object',
	properties: {
		id: {
			type: 'integer',
			example: 3,
		},
    university : {
        $ref: '#/components/schemas/University'
    },
    metadata : {
      type : 'json',
      example : {
        'applicationIndicator' : '표+백',
        'reflectionSubject' : '국수영탐',
        'reflectionNumber' : 1,
        'applyingNumber' : 1
      }
    },
    ratio : {
      type : 'json',
      example : {
        'korean' : 30,
        'english' : 30,
        'math' : 30,
        'type' : '가',
        'tamgu' : 30,
        'job' : 30,
        'foreign' : 30,
        'history' : 30

      }
    },
    description : {
      type : 'json',
      example : {
        'english' : '영어20% 반영',
        'history' : '1-4등급 10점, 5-6등급 9점 , 7-9등급 8점 가산',
        'extra' : '수능 가감점',
        'somethingSpecial' : '수능 특이사항'
      }
    },
    minGrade : {
      type : 'json',
      example : {
        'english' : '영어 최저학력등급',
        'history' :' 한국사 최저학력등급'
      }
    },
    extraRatio : {
      type : 'json',
      example : {
        'korean' : 0,
        'math' : 10,
        'english' : 0,
        'tamgu' : 0
      }
    },
    perfectScore : {
      type : 'json',
      example : {
        'korean' : 200,
        'math' : 200,
        'english' : 200,
        'tamgu' : 200
      }
    },
    totalScore : {
      type : 'integer',
      example : 1000
    },
    gradeToScore : {
      type : 'json',
      example : {
        'english' : [200,190,180,170,160,150,140,130,120,110],
        'history' : [10,10,10,10,9,9,9,9,8,8]
      }
    },
    percentileToScore : {
      type : 'json',
      example : {
        'korean' : [12,2131,213,4123,412,412],
        'english' : [12,1234,14,13,123,4213,4123,4213,4123,41,234,234,123,432,4],
        'math' : [12,31,3213,21,321,3123,1231,232,312,312,31231],
        'tamgu' : [12,5,235,2352,4534,545,453,453,53,53,535,35,353]
      }
    }
	},
	required: ['id','university']
}