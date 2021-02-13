import Sequelize from 'sequelize'

export default class Student extends Sequelize.Model {

  static init(sequelize) {
    return super.init (
      {
        
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
    this.belongsTo(models.Teacher,{
      foreignKey : 'teacherId',
      as : 'teacher'
    }),
    this.belongsTo(models.Class,{
      foreignKey : "classId",
      as : 'class'
    }),
    this.hasOne(models.ClassBelongs,{
      foreignKey : 'studentId',
      as : 'classBelongs'
    }),


    this.belongsToMany( models.WorkBook,{
      through : 'StudentWorkBook',
      as : 'workbooks'
    })
  }

  toJSON() {
    const object = Object.assign({}, this.dataValues)
  
    // delete some (key, value)
   
    delete object.createdAt
    delete object.updatedAt
    delete object.classId
    delete object.teacherId
    delete object.userId

    return object
  }
}