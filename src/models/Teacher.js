import Sequelize from 'sequelize'

export default class Teacher extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
        subject : {
          type : Sequelize.STRING,
          defaultValue : "math"
        },
        name : {
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
    }),

    this.hasMany(models.Student,{
      foreignKey : 'teacherId',
      as : 'student'
    }),

    this.hasMany(models.Class,{
      foreignKey : 'teacherId',
      as : 'class'
    }),
    this.hasMany(models.Homework,{
      foreignKey : 'teacherId',
      as : 'homework'
    }),
    this.hasMany(models.Exam,{
      foreignKey : 'teacherId',
      as : 'exam'
    })
  }


  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt

    delete object.userId

    return object
  }
}