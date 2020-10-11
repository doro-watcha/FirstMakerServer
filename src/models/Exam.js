import Sequelize from 'sequelize'

export default class Exam extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 시험 마감날짜 
          dueDate: {
            type: Sequelize.DATE,
            allowNull : true,
          }


      },
      {
        sequelize 
      }
    )
  }
}