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

