import Sequelize from 'sequelize'

export default class ClassBelongs extends Sequelize.Model {

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
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student'
    }),
    this.belongsTo(models.Class,{
      foreignKey : 'classId',
      as : 'class'
    })
  }


  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt
    delete object.studentId
    delete object.classId
    
    return object
  }
  
}