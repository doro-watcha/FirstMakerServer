import Sequelize from 'sequelize'

export default class Note extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 문제 상태
          status: {
            type: Sequelize.STRING,
            allowNull : true,
          },
          submit : {
            type : Sequelize.STRING,
            allowNull : true 
          }

      },
      {
        sequelize 
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.Homework, {
      foreignKey: 'homeworkId',
      as: 'homework'
    }),
    this.belongsTo(models.Exam,{
      foreignKey : 'examId',
      as : 'exam'
    }),
    this.belongsTo(models.Problem,{
      foreignKey : 'problemId',
      as : 'problem'
    })
  }

}