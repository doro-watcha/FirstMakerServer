import Sequelize from 'sequelize'

export default class Student extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
          // 중단원 이름 
          school: {
            type: Sequelize.STRING,
            allowNull : true,
          },
          grade : {
            type : Sequelize.STRING,
            allowNull : true 
          },
          mathGrade : {
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
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
}