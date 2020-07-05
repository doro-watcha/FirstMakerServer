import Sequelize from 'sequelize'

export default class ReflectionRatio extends Sequelize.Model {

  static init (sequelize) {

    return super.init({

      // 반영지표 ex) 표+백
      applicationIndicator : {
        type : Sequelize.STRING,
        allowNull : true
      },
      // 반영과목 ex) 국수영탐
      reflectionSubject : {
        type : Sequelize.STRING,
        allowNull : true 
      },
      koreanRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      mathRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      englishRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0 
      },
      societyRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      scienceRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      jobRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      foreignRatio : {
        type : Sequelize.FLOAT,
        defaultValue: 0.0
      },
      historyRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      // 반영 과목 갯수 
      reflectionNumber : {
        type : Sequelize.INTEGER,
        defaultValue : 0 
      },
      // 응시 갯수
      applyingNumber : {
        type : Sequelize.INTEGER,
        defaultValue : 0
      },
      englishDescription : {
        type : Sequelize.STRING,
        allowNull : true 
      },
      englishMinGrade : {
        type : Sequelize.STRING,
        allowNull : true
      },
      historyDescription : {
        type : Sequelize.STRING,
        allowNull : true 
      },
      historyMinGrade : {
        type : Sequelize.STRING,
        allowNull : true  
      },
      extraPoint : {
        type : Sequelize.STRING,
        allowNull : true 
      },
      somethingSpecial : {
        type : Sequelize.STRING,
        allowNull : true
      },
      koreanExtraRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      mathExtraRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      englishExtraRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      tamguExtraRatio : {
        type : Sequelize.FLOAT,
        defaultValue : 0.0
      },
      koreanPerfectScore : {
        type : Sequelize.FLOAT,
        defaultValue : 200
      },
      mathPerfectScore : {
        type : Sequelize.FLOAT,
        defaultValue : 200
      },
      englishPerfectScore : {
        type : Sequelize.FLOAT,
        defaultValue : 200
      },
      tamguPerfectScore : {
        type : Sequelize.FLOAT,
        defaultValue : 200
      },
      totalScore : {
        type : Sequelize.INTEGER,
        defaultValue : 1000
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

