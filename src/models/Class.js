import Sequelize from 'sequelize'

export default class Class extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      { 
          name : {
            type: Sequelize.STRING,
            allowNull : true,
          }
      },
      {
        sequelize 
      }
    )
  }
  static associate(models) {
    this.hasMany(models.Student, {
      foreignKey: 'classId',
      as: 'student'
    }),
    this.belongsTo(models.Teacher,{
      foreignKey : 'teacherId',
      as : 'teacher'
    }),
    this.hasMany(models.ClassBelongs,{
      foreignKey : 'classId',
      as: 'classBelongs'
    })
  }
  

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt
    delete object.teacherId

    return object
  }
  
}