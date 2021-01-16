import Sequelize from 'sequelize'

export default class BlackList extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      { 

      },
      {
        sequelize 
      }
    )
  }
  static associate(models) {

    this.belongsTo(models.Teacher,{
      foreignKey : 'teacherId',
      as : 'teacher'
    }),
    this.belongsTo(models.Problem,{
      foreignKey : 'problemId',
      as: 'problem'
    })
  }
  

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt
    delete object.teacherId
    delete object.problemId

    return object
  }
  
}