import Sequelize from 'sequelize'

export default class Homework extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
        // 숙제 이름 
        name : {
          type : Sequelize.STRING,
          alloNull : true 
        },
        // 숙제 마감날짜 
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


  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    }),
    this.hasMany(models.Note,{
      foreignKey : 'homeworkId',
      as : 'note'
    })
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt

    return object
  }
}